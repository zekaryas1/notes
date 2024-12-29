---
date created: Monday, December 16th 2024, 2:55:37 pm
date modified: Sunday, December 29th 2024, 3:56:51 pm
title: Microservice with Spring Boot
---

# Microservice with Spring Boot

![spring boot microservice architecture](https://spring.io/img/extra/microservices-6-dark.svg)

## Books and Learning Resources

- Microservices with Spring Boot 3 and Spring Cloud By Magnus Larsson
- Spring Microservices in Action by John Carnell and Illary Huaylupo Sánchez
- [2024 Java Spring Boot Microservices with k8s, Docker, AWS | Monolithic to Microservices PART 2](https://www.youtube.com/watch?v=EeQRAxXWDF4&t=3s)

## Components of Microservices

- **API Gateway**
	- The API Gateway serves as the single entry point for all client requests, managing routing, load balancing, authentication, and authorization.
	- **Technologies**:
		- Spring Cloud Gateway or Netflix `Zuul`.
- **Service Discovery**
	- Service discovery enables micro-services to locate each other dynamically, especially when services are added or removed frequently.
	- **Technologies**:
		- Spring cloud Eureka(Netflix Eureka), Consul.
- **Configuration Management**
	- Centralized configuration management ensures that micro-services have consistent configuration and environment information, which can be updated without redeployment.
	- **Technologies**:
		- Spring Cloud Config Server.
- **Inter-Service Communication**
	- Microservices communicate with each other via synchronous (HTTP/REST or gRPC) or asynchronous (message brokers) methods.
		- restTemplate or Feign from Netflix
- **Distributed Tracing and Logging**
	- Distributed tracing helps to follow a request's journey across various services for debugging, monitoring, and optimizing performance.
		- Track requests across services, log errors, and aggregate logs for analysis.
	- **Technologies**:
		- Sleuth (for trace IDs) and Zipkin/Jaeger for tracing, ELK Stack (Elasticsearch, Logstash, and Kibana) for logging.
- **Resilience and Fault Tolerance**
	- Micro-services must handle failures gracefully to avoid cascading errors, especially in complex, distributed systems.
		- Retry mechanisms, circuit breaking, and fallbacks to avoid downtime.
	- **Technologies**:
		- Resilience4j or `Hystrix` (deprecated), which provides circuit breakers, retries, and timeouts.
- **Event-Driven Architecture**
	- An event-driven architecture enables asynchronous communication and data consistency between services through events.
	- Publish and subscribe to events, capture data changes without direct dependencies.
	- **Technologies**:
	    - Apache Kafka, RabbitMQ, or AWS SNS/SQS for pub-sub event-driven communication patterns.
- **Authentication and Authorization**
	- Authentication and authorization ensure that only valid users and services have access to a micro-service’s resources.
	- **Technologies**:
	    - Spring Security and `OAuth2`, often paired with JWT or OpenID Connect for stateless authentication.
---
- **Data Management and Storage**
	- Each micro-service ideally has its own data store to avoid direct dependencies on other services’ databases, enforcing data autonomy.
- **Monitoring and Metrics Collection**
	- Monitoring services collect metrics and provide insights into service health and performance, crucial for operational excellence.
	- **Technologies**:
		- Micrometer, Prometheus, and `Grafana` for metrics and monitoring.
- **Continuous Integration and Continuous Deployment (CI/CD)**
	- CI/CD pipelines automate the process of building, testing, and deploying micro-services independently, allowing rapid and reliable delivery.
	- **Technologies**:
	    - CI/CD tools like Jenkins, GitLab CI, CircleCI, or cloud solutions like GitHub Actions and AWS CodePipeline.
- **Containerization and Orchestration**
	- Containers package each micro-service with its dependencies, and orchestrators manage container deployment, scaling, and networking.
	- **Technologies**:
	    - Docker for containerization, Kubernetes or Docker Swarm for orchestration.

## Each Components in Details

- Where to get the libraries
	- installing the libraries is ignored for the sake for stying up to date, the best way to install the libraries is to
		- go to to [Spring initializer](https://start.spring.io/),
		- search and select the libraries and
		- copy from the generated pom or `gradle` files.
- use the following tool to change application.properties to application.yaml and vise versa
	- [Environment Variable Generator for Spring Boot apps](https://env.simplestep.ca/)

### Service Discovery With Eureka

#### Setup Eureka Server

- create new project `service registry`
- install the eureka server library
- add the`@EnableEurekaServer` in the main file
- make sure to add properties files in the application properties file

```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

```yaml
server:
  port: '8761'
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    enable-self-preservation: false
```

#### Setup Eureka Clients

- add the eureka client
- add the `@EurekaClient` decorator in the main file
- make sure to add the required properties in the application properties

```java
@SpringBootApplication
@EnableEurekaClient
public class ClientServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientServiceApplication.class, args);
    }
}
```

```yaml
server:
  port: 8081

spring:
  application:
    name: client-service

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

- when to use prefer ip address?
	- by default services register themselves using hostname, this property makes them register with their ip address.
	- why?
		- When running services in cloud environments or across multiple regions, hostname resolution can become inconsistent. An IP address offers a stable identifier for service instances.
		- In some environments, the hostname may not resolve properly due to DNS misconfigurations or delays. Using the IP address ensures direct and reliable communication.

```yml
eureka:
	instance:
		preferIpAddress: true
```

#### Feign for Rest Communication

- what is Feign
	- a declarative web service client in Spring Boot. It simplifies the process of making HTTP API calls to other services in a microservices architecture by providing a cleaner, annotation-driven approach.
- why Feign is better than restTemplate
	- Declarative, minimal boilerplate code.
	- Cleaner, as method signatures define the API.
	- Easily integrates with Resilience4j, Eureka or Hystrix.
	- Integrated with Spring Cloud Load Balancer.
- how to use Feign
	- install the feign library
	- add the decorator to the main class `@EnableFeignClients`
	- create a feign client interface class
	- inject the client interface make calls

```java
@FeignClient(name = "users-service") // Name of the Eureka-registered service
public interface UserServiceClient {

    @GetMapping("/users/{id}") // Endpoint in the users-service
    User getUserById(@PathVariable("id") Long id);
}
```

```java
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private UserServiceClient userServiceClient;

    @GetMapping("/users/{id}")
    public User getUserDetails(@PathVariable Long id) {
        return userServiceClient.getUserById(id);
    }
}
```

### Configuration Management with Spring Cloud Config

- why do we need centralised configuration management
	- When configuration properties are stored in a single, centralized location (e.g., Git, SVN, or file system). This eliminates the need to manage configurations individually for each service.
	- Microservices can fetch updated configurations without restarting, allowing runtime updates to critical parameters, like feature toggles or database connection details.
	- It supports environment-specific configurations (e.g., dev, test, production) using profiles. This reduces duplication and ensures proper configuration per environment.
	- By integrating with Git or similar version control systems, the Config Server enables version control for configurations.
- what are the available options
	- git
	- vault

#### Setup Config Server

- create a git repository for configuration management
- install the Spring cloud config server
- use the `@EnableConfigServer` decorator on the main class
- add the giturl to the properties file

```
your-repo/
  ├── application.properties
  ├── application-dev.properties
  ├── application-prod.properties
```

```application.yml
#dev
app.zipkin.url=http://localhost:...

#product(using service name)
app.zipkin.url=https://zipkin:...
```

```java
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

```yml
server:
  port: 8888

spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/your-username/your-repo.git
          default-label: main
```

- **service-specific properties**
	- you can organize your configuration files to support general properties for all services and service-specific properties that override the general ones.
	- steps
		- create your properties with each service name.
		- spring them will load properties with the following resolution order
			1. **Service-specific properties** (e.g., `user-service.yml`).
			2. **Profile-specific properties** (e.g., `user-service-dev.yml`).
			3. **General properties** (e.g., `application.yml`).
			4. **Profile-specific general properties** (e.g., `application-dev.yml`).

- create service specific properties in config server

```
config-repo/
  ├── application.yml          # General properties for all services
  ├── user-service.yml         # Specific properties for user-service
  ├── product-service.yml      # Specific properties for product-service
  ├── product-service-dev.yml  # Specific properties for product-service dev mode
  └── gateway-service.yml      # Specific properties for gateway-service
```

#### Setup Config Clients

- add the spring cloud config client library
- modify your properties file to point to the config server
- access and use the configuration files

```yml
spring:
  application:
    name: my-service
  profiles:
    active: dev #this will load the application-dev.properties(yml)
  cloud:
    config:
      uri: http://localhost:8888
```

- accessing the configuration files

```java
public class ConfigController {

    @Value("${app.name}")
    private String appName;

    @Value("${app.description}")
    private String appDescription;

}

@Configurations
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    private String name;
    private String description;

    // Getters and setters
}
```

- how to switch profiles
	- you can either change the profile or configure spring config cloud to load from different branch i.e dev branch

```
spring.profiles.active=prod
```

- how to make config server optional?
	- optional: Prefix: Indicates that if the Config Server is unavailable or the URL is invalid, the application will not fail to start. Instead, it will fall back to local configuration files.

```
spring:
  config:
    import: optional:configserver:http://localhost:8080
```

### Api Gateway Using Spring Cloud Gateway

- An API Gateway is essential in a microservices architecture because it:
	- Provides a centralized entry point for all client requests.
		-  Instead of clients needing to know the addresses of individual microservices (e.g., user-service, product-service), they only need to interact with the API Gateway.
	- Load balancing
		- If there are three instances of user-service, the API Gateway can balance the load between them.
	- Authentication and Authorization
		- The API Gateway can handle authentication and authorization for all incoming requests, ensuring that only valid requests reach the microservices.
	- Rate Limiting and Throttling
		- Limit a client to 100 requests per minute to protect the backend services from being overwhelmed.
	- other
		- SSL Termination
		- Caching
		- Request and Response Transformation
		- Versioning

#### How to Use Spring Cloud Gateway

- create a new project for the gateway
- install the library
- set it up as a eureka client
- add the configurations

```java
@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
```

- Option 1: Static Routes (Hardcoded Service URLs)

```
server:
  port: 8080 # Gateway will run on port 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://localhost:8082
          predicates:
            - Path=/user-service/**
        - id: product-service
          uri: http://localhost:8083
          predicates:
            - Path=/product-service/**
        - id: config-service
          uri: http://localhost:8084
          predicates:
            - Path=/config-service/**

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

- Option 2: Dynamic Routes (Using Eureka Service Discovery)

```
server:
  port: 8080 # Gateway will run on port 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/user-service/**
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/product-service/**
        - id: config-service
          uri: lb://config-service
          predicates:
            - Path=/config-service/**

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

- how to make gateway automatically fetch the services
	- if you connect the gateway to eureka, then you can enable the discovery locator feature to true and spring gateway will automatically fetch, load the services and provide a URL
	- The URL mapping strategy
		- `{gateway-url}/{service-name}/{service-route}`
		- ex `http://localhost:8080/user-service/api/v1/login`
	- when to use?
		- manually specifying service gives you the control what and how to define routes
		- this might be useful you are eventually going to specify all services anyway
			- if you add or remove new service, without adding the configuration the gateway can automatically provide or remote the routes.

```yml
spring:
	cloud:
		gateway:
			discovery.locator:
				enabled: true
				lowerCaseServiceId: true
```

- integration with actuator?
	- if you are working with actuator you can use the `{gateway-url}/actuator/gateway/routes` to get a listing of all the mappings on our service

- what are Predicate and Filter Factories?
	- Predicate Factories
		- objects that allow us to check if the requests fulfill a set of conditions before executing or processing the requests
		- example:
			- we can use predicate to check whether a request matches required path, date, header method…
	- Filter Factories
		- filters let us modify the incoming and outgoing HTTP requests and responses.
		- example:
			- AddRequestHeader, AddResponseHeader, PrefixPath(Adds a prefix to the HTTP request path.), RequestRateLimiter, RewritePath…
	- Example:
		- Scenario:
			- Imagine we have a user-service that doesn’t follow a uniform API prefix. For example:
				- To create a user, the endpoint is `/api/v1/user`.
				- To access a token, the endpoint is `/api/v1/token`.
		- Challenge:
			- We want to define a unified route in the API Gateway to handle these endpoints without requiring the client to know the specific paths.
		- Solutions:
			- Automatic Route Discovery:
				- This approach exposes the service name in the URL, which may not be ideal for all use cases maybe we want shorter or different name.
			- Manual Route Definition with Filters and Predicates:
				- Use predicates to match specific paths and filters to rewrite the URLs before forwarding them to the user-service.

```yml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service-route
          uri: lb://user-service # Use Eureka service name
          predicates:
            - Path=/user-management/** # Match requests starting with /user-management
          filters:
            - RewritePath=/user-management/(?<segment>.*), /api/v1/$\{segment} # Rewrite the path
```

### Distributed Tracing with Zipkin and Micrometer

- **distributed tracing** is a practice for monitoring and debugging the flow of requests across multiple services.
- Here are the **key benefits** of distributed tracing and why it’s essential to trace requests from start to finish:
	- End-to-End Visibility
		-  In a microservices architecture, a single request often spans multiple services. Without tracing, it’s difficult to understand how the request is processed across these services.
	- Debugging and Troubleshooting:
		- Debugging in a distributed system is challenging because errors can occur in any service. Tracing provides detailed logs and context for each service involved in the request.
	- Performance Optimization
		- Performance issues in one service can impact the entire system. Tracing helps you optimize slow services and improve overall system performance.
	- Transaction Correlation
		- Without correlation, logs from different services are disconnected, making it hard to trace the flow of a specific request.
- Distributed tracing systems and metrics collections libraries
	- Tracing systems
		- Zipkin
		- Jaeger
	- Metrics collections library
		- Micrometer
			- A metrics collection library that integrates with tracing tools like Zipkin and Jaeger.
- why is actuator required for `zipkin` to work?
	-  It provides essential features that enhance the observability and management of your application, such as
		- Actuator exposes a wide range of metrics (e.g., HTTP requests, JVM memory, CPU usage) and health information about your application.
		- Actuator integrates with monitoring tools like Prometheus and Grafana, enabling real-time monitoring and alerting.

#### Setup to Work with Zipkin Micrometer

 - install `zipkin` first, preferable with docker
 - install the libraries
	 - search `zipkin` on spring initializer and copy the list of libraries
 - add the configurations options to your properties file

```
docker run -d -p 9411:9411 openzipkin/zipkin
```

```yml
spring:
  application:
    name: your-service-name
  zipkin:
    base-url: http://localhost:9411

management:
  tracing:
    sampling:
      probability: 1.0

# if you need actuator endpoints
management:
  endpoints:
    web:
      exposure:
        include: "health" # Expose health Actuator endpoints or use ("*") to expose all end points
```

- open the `zipkin` url on browser and use the ui to investigate request flows and issues
	- [zipkin local url](http://localhost:9411)

- how to add feign client to zipkin micrometer ?
	- if you are using feign client in your project you need to add the feign micrometer integration library

```xml
<dependency>
    <groupId>io.github.openfeign</groupId>
    <artifactId>feign-micrometer</artifactId>
    <version>${feign-micrometer-latest-version}</version>
</dependency>
```

- what is a good value for sampling probability?
	- what is sampling probability?
		- The sampling probability determines how many traces are collected and sent to Zipkin. Setting the right sampling probability is important to balance performance and observability.
	- for dev environment 1.0
		- In a development environment, you want to capture all traces to debug and observe the behavior of your application. This ensures that you don’t miss any important traces while testing.
	- for production 0.1 - 0.2
		- In production, capturing all traces can generate a large amount of data, which can overwhelm Zipkin and impact performance. A lower sampling rate reduces the load on the tracing system while still providing enough data for observability.

### Resilience And Fault Tolerance with Resilience4j

- Fault tolerance involves designing systems to handle failures gracefully by:
	- Detecting failures: Identifying when a component or service has failed.
	- Isolating failures: Preventing failures from cascading to other parts of the system.
	- Recovering from failures: Automatically or manually restoring functionality.
	- Providing fallbacks: Offering alternative responses or behaviors when a failure occur
	- Resilience: Prevents cascading failures and isolates issues.
- Resilience4j:
	- A lightweight fault tolerance library for Java.
- Here are some common fault tolerance techniques used in microservices?
	- retries
	- rate limiting
	- bulkheads
	- circuit breakers
	- fallbacks
	- tip:
		- You can stack more than one decorator on any functional interface, lambda expression or method reference

#### Circuit Breakers

- What It Does:
	- Stops making requests to a failing service after a certain number of failures, allowing it to recover.
- **Benefit**:
	- Prevents cascading failures and reduces load on the failing service.
- what are Circuit breaker state transitions and how do they work?
	- ![circuit breaker state transition illustration](https://miro.medium.com/v2/resize:fit:315/1*Vqp5A2zcMQ9AjIX3_4_pRg.jpeg)
	- initially the state is
		- closed where all requests are allowed to pass, if errors keep stacking up the state transitions to open state
		- open state is where all requests not allowed to pass, after some duration the state goes to half-open
		- half-open state is where only some requests are processed, if requests success starts to grow the state if updated to closed otherwise it is goes back to open state.
- setup and for circuit breakers
	- install the library `resilience4j` and spring aspect oriented programming(aop)
		- [resilience4j setup instruction](https://resilience4j.readme.io/docs/getting-started-3)
	- add the configurations inside your application.properties(yaml) file
	- use the `@CircuitBreaker` annotation

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

- you need to evaluate and use the proper value that match your applications need
	- we can define separate configurations for each external instances with want to integrate, the service identifier we specify here will be used as name later.

```yaml
resilience4j:
  circuitbreaker:
    instances:
      myService:
        registerHealthIndicator: true
		slidingWindowSize: 10
		permittedNumberOfCallsInHalfOpenState: 3
		slidingWindowType: TIME_BASED
		minimumNumberOfCalls: 20
		waitDurationInOpenState: 50s
		failureRateThreshold: 50
		eventConsumerBufferSize: 10
```

- now you can use `@CircuitBreaker` when you interact with external service

```java
@Service
public class MyService {

    @CircuitBreaker(name = "myService", fallbackMethod = "fallbackMethod")
    public String callExternalService() {
        // Simulate a service call (replace with your logic)
        if (Math.random() > 0.5) {
            throw new RuntimeException("Simulated service failure");
        }
        return "Success!";
    }

    // Fallback method
    public String fallbackMethod(Throwable throwable) {
        return "Fallback response due to: " + throwable.getMessage();
    }
}
```

#### Retry

- What It Does:
	- Automatically retries a failed request a specified number of times.

```
resilience4j:
  retry:
    instances:
      myService:
        maxAttempts: 3                     # Maximum retry attempts
        waitDuration: 2s                   # Wait between retries
```

```java
@Service
public class MyService {

    @Retry(name = "myService", fallbackMethod = "retryFallback")
    @CircuitBreaker(name = "myService", fallbackMethod = "circuitBreakerFallback")
    public String callExternalService() {
        // Simulate a service call (replace with actual logic)
        if (Math.random() > 0.5) {
            throw new RuntimeException("Simulated service failure");
        }
        return "Success!";
    }

    // Retry fallback method
    public String retryFallback(Throwable throwable) {
        return "Retry Fallback: " + throwable.getMessage();
    }

    // Circuit Breaker fallback method
    public String circuitBreakerFallback(Throwable throwable) {
        return "Circuit Breaker Fallback: " + throwable.getMessage();
    }
}
```

#### Rate Limiting

- What It Does:
	- Limits the number of requests a service can handle within a specific time period.
- **Benefit**:
	- Prevents overloading services and ensures fair usage.

```
resilience4j:
  ratelimiter:
    instances:
      myService:
        limitForPeriod: 5                 # Max number of calls allowed in a refresh period
        limitRefreshPeriod: 1s            # Refresh period
        timeoutDuration: 2s                # Timeout duration for waiting
        registerHealthIndicator: true
```

```java
@Service
public class MyService {

    @RateLimiter(name = "myService", fallbackMethod = "rateLimiterFallback")
    public String rateLimitedService() {
        // Simulate a service call
        return "Rate Limited Service Response";
    }

    // Rate Limiter fallback method
    public String rateLimiterFallback(Throwable throwable) {
        return "Rate Limiter Fallback: Too many requests, try again later.";
    }
}
```

#### Bulkhead Pattern

- **What It Does**: Isolates resources (e.g., threads, connections) for different services to prevent failures in one service from affecting others.
- Benefit: Limits the impact of failures and improves system stability.

```yml
resilience4j:
  bulkhead:
    instances:
      userServiceBulkhead:
        maxConcurrentCalls: 5 # Maximum number of concurrent calls allowed
        maxWaitDuration: 100ms # Maximum time to wait for a permit
```

- When the Bulkhead is full (i.e., the maximum number of concurrent calls is reached), a BulkheadFullException is thrown. You can handle this exception using a fallback method.

```java
@Service
public class UserService {

    @Bulkhead(name = "userServiceBulkhead", type = Type.SEMAPHORE, fallbackMethod = "getUserDetailsFallback")
    public String getUserDetails(String userId) {
        // Simulate a long-running operation
        try {
            Thread.sleep(1000); // Simulate delay
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return "User details for " + userId;
    }
}

// Fallback method
public String getUserDetailsFallback(String userId, BulkheadFullException ex) {
	return "Fallback response: Service is busy. Please try again later.";
}
```

- Resilience4j also supports a Thread Pool Bulkhead, which uses a thread pool to isolate resources.

```yml
resilience4j:
  thread-pool-bulkhead:
    instances:
      userServiceThreadPoolBulkhead:
        maxThreadPoolSize: 10 # Maximum number of threads in the pool
        coreThreadPoolSize: 5 # Core number of threads in the pool
        queueCapacity: 10 # Queue capacity for waiting tasks
```

#### More Info

- integrating with actuator?
	- If you are using Spring Boot Actuator, Resilience4j automatically integrates with it.
		- http://localhost:8080/actuator/metrics/resilience4j.circuitbreaker.calls
- working with micrometer
	- you can bind resilience4j modules to micrometer to provide metrics.
	- [Resilience4j + Micrometer](https://resilience4j.readme.io/docs/micrometer)
- working with feign client?
	- `resilience4j-feign` makes it easy to incorporate "fault tolerance" patterns into the feign framework, such as the CircuitBreaker and RateLimiter.
	- [Resilience4j + Feign](https://resilience4j.readme.io/docs/feign)
- testing your new fault tolerance configurations
	- use `Apache Jmeter` java tool or any other performance measurement tools

### Securing Microservice

#### Keyclock

- Keycloak is an open-source Identity and Access Management (IAM) solution developed by Red Hat.
- It provides a comprehensive set of features for securing applications and services, including authentication, authorization, single sign-on (SSO), and user management.
- Steps:
	- Set up Keycloak and configure a realm, client, roles, and users.
		- [downloads - Keycloak](https://www.keycloak.org/downloads)
		- Keyclock be default uses Local H2 database which is suitable to testing and can be updated to use SQL db such as Postgres sql.
		- A realm is a space where you manage users, roles, and clients.
		- what are clients?
			- often the applications(web-app, mobile-app…) or services that we want to secure by providing a single sign-on (SSO) solution.
	- Add the Keycloak dependency and configure it in your microservice.
	- Enable Keycloak security and secure endpoints using Spring Security annotations.

## Microservice with Kubernetes

### Spring Cloud Vs Kubernetes

- Spring Cloud Microservices:
	- Focuses on building microservices using Spring Boot and Spring Cloud tools for features like service discovery (Eureka), configuration management (Config Server), load balancing (Ribbon), and API Gateway (Zuul).
	- It's primarily for developing microservices at the application level.
- Kubernetes-Oriented Microservices:
	- Focuses on deploying and managing microservices in a containerized environment using Kubernetes.
	- It provides orchestration features like automated scaling, load balancing, self-healing, and service discovery at the infrastructure level, independent of the application framework.

### When to Use Which

- Spring cloud microservice
	- You are building Java/Spring Boot applications.
	- You want to handle application-level concerns (e.g., service discovery, configuration management) within the application.
	- You are running on a platform that does not provide built-in microservices features (e.g., bare metal, VMs).
- Kubernetes-Oriented Microservices
	- You are building polyglot microservices (using multiple programming languages or frameworks).
	- You want to leverage infrastructure-level features (e.g., container orchestration, scaling, resource management).
	- You are running on a containerized platform (e.g., Kubernetes, OpenShift).

### Equivalent Kubernetes Services

- service no longer needed when using Kubernetes?
	- List of features from Spring cloud that can be replaced with Kubernetes features.

| Feature                      | Spring Cloud Microservices                | Kubernetes-Oriented Microservices                                                                                                       |
| ---------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary Focus**            | Application-level concerns                | Infrastructure-level concerns                                                                                                           |
| **Service Discovery**        | Spring Cloud Netflix Eureka, Consul       | [Kubernetes DNS and Service Objects](https://kubernetes.io/docs/concepts/services-networking/service/#discovering-services)             |
| **Configuration Management** | Spring Cloud Config Server                | [ConfigMaps](https://kubernetes.io/docs/user-guide/configmap/) and [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) |
| **Load Balancing**           | Ribbon, Spring Cloud LoadBalancer         | Kubernetes Service                                                                                                                      |
| **Fault Tolerance**          | Hystrix, Resilience4j                     | Kubernetes Health Checks, Rolling Updates, Resilience4j                                                                                 |
| **API Gateway**              | Spring Cloud Gateway, Zuul                | Ingress Controllers (e.g., NGINX, Traefik)                                                                                              |
| **Deployment and Scaling**   | External tools (e.g., Docker, Kubernetes) | Kubernetes Deployments, ReplicaSets, HPA                                                                                                |
| **Monitoring and Logging**   | Spring Boot Actuator, Micrometer          | Kubernetes Metrics Server, EFK Stack                                                                                                    |
| **Resource Management**      | Handled by underlying infrastructure      | Kubernetes Resource Requests and Limits                                                                                                 |
| **Ecosystem**                | Spring ecosystem (Java/Spring Boot)       | Platform-agnostic (any language/framework)                                                                                              |

### Spring Cloud Kubernetes

- [Spring Cloud Kubernetes](https://spring.io/projects/spring-cloud-kubernetes) provides implementations of well known Spring Cloud interfaces allowing developers to build and run Spring Cloud applications on Kubernetes.
	- this is not a requirement but it helps simplify spring boot integration with Kubernetes.
- In this practice, Kubernetes will handle the infrastructure and scaling, while Spring Cloud (or equivalent tools) will take care of application-level concerns.
	- i.e We can integrate Spring cloud config to work with Config Maps and secrets
