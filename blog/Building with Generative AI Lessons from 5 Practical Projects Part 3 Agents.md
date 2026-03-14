---
title: "Building with Generative AI: Lessons from 5 Practical Projects Part 3: Agents"
date created: Friday, August 29th 2025, 12:59:17 pm
date modified: Friday, August 29th 2025, 2:13:53 pm
tags:
  - gen_ai
---

# Building with Generative AI: Lessons from 5 Practical Projects Part 3: Agents

## What to Expect

What are agents and how AI companies define them, and how tools give agents access to external environments.

How to build agents with the Google ADK library and how to connect small agents to build comprehensive `agentic`
solutions.

<!-- truncate -->

## Structured Outputs

We need to look at structured outputs first before we dive in, as they are a core component of agents.

One of the features of LLMs is their ability to return output in a desired format, such as binary answers ("yes" or "
no", true or false), JSON, or code.

This helps us use LLMs as a garden hose, connecting one to another with understandable output formats.

### Code Example 1: Agentic RAG

Example 1: Does the user question followup query, or is it related to company information needing a RAG search?

- GitHub code
  link: [gen-ai/adk_agents/agents/simple_agentic_rag/agent.py at main · zekaryas1/gen-ai · GitHub](https://github.com/zekaryas1/gen-ai/blob/main/adk_agents/agents/simple_agentic_rag/agent.py)

We can use the `Pydantic` BaseModel in Google ADK to specify the output schema we want.

```python
class OutputSchema(BaseModel):  
    classification: str = Field(description="The final classification which is either RAG query or followup question")
```

Preparing the prompt should take some time; for example, it's a good idea to include an example and an output format.

```python
agent_instruction = """  
	You are an AI assistant for XY Company.  
	Your task is to classify user queries into one of two categories:  
	  
	Query Classification  
	  
		RAG query → The query requires searching the internal knowledge database (e.g., company-specific facts, data, or policies).  
		  
		Followup question → The query does not require a database search and can be answered directly (e.g., conversational context or task execution).  
	  
	Examples  
		User query: "When was XY Company founded?"  
		Response: "RAG query"  
		  
		User query: "Summarize our conversation."  
		Response: "Followup question"  
		  
		User query: "How many employees does XY have?"  
		Response: "RAG query"  
	  
	Output Format  
		Return only one of the following strings as the response:  
		"RAG query"  
		"Followup question"  
"""
```

```python
from pydantic import BaseModel, Field    
from google.adk import Agent  
  
AGENT_MODEL = "gemini-2.0-flash"

root_agent = Agent(  
    name="simple_agentic_rag",  
    model=AGENT_MODEL,  
    instruction=agent_instruction,  
    description="A user query classification agent",  
    output_schema=OutputSchema  
)
```

This is some of the output I got.

```txt
who is the CEO?
{ 
	"classification": "RAG query" 
}

please explain in simple english?
{ 
	"classification": "Followup question" 
}
```

### Code Example 2: Query Analyzer

Example 2: Given a query, return the relevant tables, columns and final query to consider.

- [gen-ai/adk_agents/agents/simple_query_analyzer_agent/agent.py at main · zekaryas1/gen-ai · GitHub](https://github.com/zekaryas1/gen-ai/blob/main/adk_agents/agents/simple_query_analyzer_agent/agent.py)

```python
agent_instruction = """
        You are an AI assistant that generates structured output for SQL queries.
        Given the database schema below, your task is to identify the relevant tables, columns, and construct the correct SQL query based on a user’s request.

        Database Schema
            Users(id, name, country)
            Posts(id, title, body, user_id)

        Examples
            User query: "how many users there are"
                Output (JSON):
                {
                  "tables": ["users"],
                  "columns": ["id"],
                  "query": "select count(id) from users"
                }

            User query: "every name in the table"
                Output (JSON):
                {
                  "tables": ["users"],
                  "columns": ["name"],
                  "query": "select name from users"
                }

            User query: "every user's post"
                Output (JSON):
                {
                  "tables": ["users", "posts"],
                  "columns": ["name", "title", "body"],
                  "query": "select name, title, body from users u join posts p on u.id = p.user_id"
                }

        Output Format
            You must output only a JSON object in the following format:
            {
              "tables": string[],
              "columns": string[],
              "query": string
            }
"""
```

```python
class OutputSchema(BaseModel):
    tables: list[str] = Field(description="Relevant tables")
    columns: list[str] = Field(description="Relevant columns")
    query: str = Field(description="SQL query based on user's request")
```

```python
from pydantic import BaseModel, Field
from google.adk import Agent

AGENT_MODEL = "gemini-2.0-flash"

root_agent = Agent(
    name="simple_query_analyzer",
    model=AGENT_MODEL,
    instruction=agent_instruction,
    description="Database query analyzer and deconstruction agent.",
    output_schema=OutputSchema
)
```

```txt
how many posts are there?
{ 
	"tables": ["posts"], 
	"columns": ["id"], 
	"query": "select count(id) from posts"
}

how many user have not posted yet?
{ 
	"tables": ["users", "posts"], 
	"columns": ["id"], 
	"query": "SELECT count(id) FROM users WHERE id NOT IN (SELECT user_id FROM posts)" 
}
```

## What is an Agent?

There are many definitions of agents. Let’s see two from the two leading AI companies:

- **OpenAI’s definition:**
    - Agents represent **systems that intelligently accomplish tasks**, ranging from executing simple workflows to
      pursuing complex, open-ended objectives.
- **Anthropic’s definition:**
    - **Agents** are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over
      how they accomplish tasks.

This can be challenging to understand, but in summary, agents have common properties:

- **Components**: `Specialized LLM Model + Tools + Loop + Context`
- **Specialized model**:
    - An LLM that converts inputs into action plans and executes these plans through available tools or Agent Computer
      Interfaces.
    - The models used in agents should be able to break down complex tasks into manageable steps.
- **Tools**:
    - Agents gateway to external APIs, data stores, and functions for real-world actions.
- **Loop**:
    - Agents do not necessarily have a linear execution path; they can use different tools, then return to call another
      tool until their plan is satisfied or they are terminated.
    - Agents can also have humans-in-the-loop, where a human confirms an action (e.g., installing a new library).

### **What Can Agents do**

- Perform tasks independently: Reason, plan, and execute without human intervention.
- Interact with users: Engage with humans for privileged or important tasks.
- Utilize external tools: Pair with tools like weather sensors, databases, and MCPs.
- Coordinate with other agents to complete complex workflows.

## What Are Tool and why Agents Need Them?

Tools are functions that extend the capabilities of LLM-based agents beyond their inherent knowledge and reasoning.

### **Purpose Of Tools**

- Enable interaction with external and real-time data.
    - For example, a weather tool can return real-time weather data to the agent.
- Support querying databases or making API requests.
    - LLMs cannot natively interact with databases, so tools allow them to run generated queries and return affected
      rows.
- Facilitate calculations or data processing.
- Allow execution of specific actions (e.g., creating files, running code).
- Handle authentication processes.

## Code Example 3: Simple Agent with Tool

![Building todo assistance agent with todo toolkit](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fq0gwnzfaak2rwzzelacr.png)

Let’s build a to-do assistant agent. It will help users manage to-dos with simple interactions, such as:

- "Do I have any to-dos today or next week?"
- "Create a to-do for today or tomorrow."
- "Update this to-do to completed or back to pending."

**What tools do we need?**

The agent is unable to track todo lists natively. We want persistent todos that persist over discussions, so we can use
a simple database like SQLite, but for simplicity, we'll use a Python dictionary this time.

This means we need a way to interact with the in memory database, using the LLM as the interaction layer.

**Breaking down the tools:**

The agent acts as a CRUD layer: Create, Read, Update, Delete. We’ll skip Delete and consider updating a to-do’s status
as enough.

The agent should be provided with precise instructions, which include the current date, current date, example, and
output format, as well as the available tools and their use-cases. This instruction may become verbose and may
necessitate continual updating based on model interaction.

- [gen-ai/adk_agents/agents/todo_agent/agent.py at main · zekaryas1/gen-ai · GitHub](https://github.com/zekaryas1/gen-ai/blob/main/adk_agents/agents/todo_agent/agent.py)

```python
agent_instruction = f"""
        You are a Todo Assistant Agent that helps users manage their todos.
        You can create, update, and read todos by using the appropriate tools and responding in a clear format.
        
        Todo Schema
            Todo:
                title: string (required)
                status: one of pending | done | canceled
                planned_date: {{ year, month, day }}
        
        Tasks & Tools
            1. Create Todo
                Use create_todo_tool to create a todo.
                Extract from the user query:
                    title (required → if missing, ask user to provide one).
                    planned_date (if not specified, use the current date).
            2. Update Todo
                Use update_todo_tool to update either or both of:
                    status
                    planned_date
                Requirements:
                    title is required.
                    At least one of status or planned_date must be provided.
                If the exact title is unclear:
                    First, call read_all_todo_tool to list existing todos.
                    Try to identify the intended todo.
                    If no matching todo is found, inform the user.
            3. Read All Todos
                Use read_all_todo_tool to fetch all todos.
                The tool returns JSON/dictionary format.
                Transform the response into a human-readable format for the user.
            
            
        Examples
            User query: "Create a todo to go to the library tomorrow"
                Extracted data:
                    title: "go to the library"
                    planned_date: current_date + 1
                Tool: create_todo_tool with extracted data
        
            User query: "Move going to the library to next week"
                This is an update request (changing planned_date).
                Steps:
                    Call read_all_todo_tool
                    Identify the correct todo
                    Call update_todo_tool with title and new planned_date
           
            User query: "I have gone to the library"
                This is a status update (done).
                Steps:
                    Call read_all_todo_tool
                    Identify the correct todo
                    Call update_todo_tool with title and status = "done"
        
        Date Handling
            Current date is:
                {{"year": {current_date.year}, "month": {current_date.month}, "day": {current_date.day} }}
            Planned date format to use:
                Always pass in JSON format: {{"year": YYYY, "month": MM, "day": DD }}
                
        Output Format
            Use formatting (lists, bullets, bold text) for better readability.
            Always reply in clear, natural language that feels conversational.
            Dates should always be shown in a readable, human format:
                Example: "Aug 27, 2025" instead of "2025-08-27"
            Relative dates can also be expressed naturally (e.g., "tomorrow", "next Monday"), but include the exact calendar date for clarity.
      
```

We are now define our root agent and transferring the necessary tools and instructions.

```python
AGENT_MODEL = "gemini-2.0-flash"
todos_dictionary: Dict[str, Todo] = {}  
current_date = datetime.datetime.now()

root_agent = Agent(
    name="todo_assistance_agent",
    model=AGENT_MODEL,
    instruction=agent_instruction,
    description="A todo agent able to create and manage todos",
    tools=[
        create_todo_tool,
        update_todo_tool,
        read_all_todo_tool
    ]
)
```

- Let's look at one of the tools in detail, `update_todo_tool`:
    - It has extensive documentation on its arguments and return types, which is very useful for the agent to interact
      with our tool.
    - It includes multiple checks on the passed data. We need to validate the agent's input, as the agent's behavior is
      not deterministic and we should not trust it blindly.
    - Our return types contain information that tells the agent exactly what went wrong.

```python
def update_todo_tool(
        title: str,
        status: Literal["pending", "done", "canceled"],
        planned_date: dict
) -> ToolResponse:
    """
    Update an existing todo's status or planned date.

    Args:
        title: The title of the todo to update (required).
        status: The new status ('pending', 'done', 'canceled'). Optional.
        planned_date: The new planned date as {year: int, month: int, day: int}. Optional.

    Returns:
        A dictionary with 'status' ('successful' or 'failed') and 'report' (error message or updated todo).
    """
    if title not in todos_dictionary:
        return {"status": "failed", "report": "Todo does not exist"}

    if not status and not planned_date:
        return {
            "status": "failed",
            "report": "At least one of status or planned_date must be provided"
        }

    try:
        current_todo = todos_dictionary[title]
        new_status = status if status else current_todo.status
        if status and status not in {"pending", "done", "canceled"}:
            return {"status": "failed", "report": "Status must be one of: pending, done, canceled"}

        new_date = _parse_date(planned_date) or current_todo.planned_date
        todos_dictionary[title] = Todo(
            title=title,
            status=new_status,
            planned_date=new_date
        )
        return {
            "status": "successful",
            "report": {
                "title": title,
                "status": new_status,
                "planned_date": new_date.isoformat()
            }
        }
    except ValueError as e:
        print(e)
        return {"status": "failed", "report": str(e)}
```

- One conversation history where I interacted with the agent

```
- do I have any todos?
	You don't have any todos currently.

- I am going to school later today
	OK. I can create a todo for that. What title would you like to use?

- going to school
	OK. I've created a todo titled "going to school" for today, Aug 26, 2025.

- also I am watching a new movie next week
	OK. I've created a todo titled "watching a new movie" for next week, Sep 2, 2025.

- list me my todos
	Here are your todos:
		- **going to school**: planned for Aug 26, 2025, status is pending.
		- **watching a new movie**: planned for Sep 2, 2025, status is pending.

- I am actually not going to school I've changed my mind
	OK. I've updated the todo "going to school" to canceled.

- list me my todos
	Here are your todos:	
		- **going to school**: planned for Aug 26, 2025, status is canceled.
		- **watching a new movie**: planned for Sep 2, 2025, status is pending.
```

## Agents WorkFlow

Building a complete agent means more than a single agent; most solutions involve multiple agents working together to
solve a problem.

Consider a research assistant agent: in this case, one agent might specialize in finding relevant information from the
internet using a `search_tool`. A supporting agent could be responsible for refining the collected documents based on
the user’s query. Finally, an assessment agent would determine whether additional information is needed or if the
workflow is complete.

Depending on the problem you are trying to solve, your solution workflow might be categorized into these workflows

### Linear or Sequential Workflow

![Sequential workflow](https://dgc8kkav4l0lgf.archive.is/pilY2/190994fc386ebb6f0771b60fd9bbf7dc71623d54.webp)

Sequential workflow decomposes a task into a sequence of steps, where each LLM call processes the output of the previous
one.

A writing assistant can be a linear workflow:

- An agent writes a draft → hands it over to a critic agent → final editor agent applies the critiques and writes the
  final version.

### Coordinator Workflow

![routing workflow](https://dgc8kkav4l0lgf.archive.is/pilY2/d028546588553368ac0f6cb77912bb0cf608cc06.png)

In this workflow, agents have sub-agents to which they route a request.

When the router agent receives an instruction, it assesses which sub-agent should handle it.

Example: In `agentic` RAG, the coordinator RAG can decide if a sub-agent with a `search_tool` should handle the request,
or if another sub-agent with a `rag_tool` should do it.

- `"What is the new employee onboarding process?"` → sub-agent 2 with `rag_tool`.
- `"What do people think about our company based on online reviews?"` → sub-agent 1 with `search_tool`.

### Loop Workflow

![loop workflow](https://dgc8kkav4l0lgf.archive.is/pilY2/892d0e6e5a8cd0713294307d126cf9563462ccd1.webp)

In a loop workflow, agents keep working, refining, and improving their output until their goal is met or a human stops
the loop.

Again, a writing assistant can be a loop workflow agent, where writer and editor workflows keep evolving until there are
no suggestions left, or until a human decides it’s good enough.

### Parallel Workflow

![parallelization workflow](https://dgc8kkav4l0lgf.archive.is/pilY2/b7e384eb54111c49700792eb7b827f5fb4537729.webp)

In this workflow, two agents work in parallel, trying different approaches to solve an issue.

Example: A code review assistant might have one agent checking for vulnerabilities and another checking for code
quality, both working in parallel. Their results are then aggregated into a single review.

### Combination

You can build complex agentic solutions by combining different workflows, such as a **Coordinator** with a **Loop**
workflow. Many agent development libraries already include abstractions for this, and there are managed solutions on top
of these ideas such as [n8n - AI Workflow Automation Platform & Tools](https://n8n.io/).

## Code Example 4: Workflow Agent

![workflow agent example with weather tool, letter counter tool and research assistance agent](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9afb63146wbi1pi8rtab.png)

Let's make out second example a multi-purpose agent, meaning it can help with multiple types of tasks. In our case, this
multi-purpose agent can:

- Answer questions about the weather
- Count specific alphabet characters in a given word (e.g., “How many b’s are there in strawberry?”)
- Act as a research assistant that can research and revise steps until the result is satisfactory.

**High-level workflow:**

- We can identify 3 agents:
    - **Agent 1:** Weather agent with a weather tool
    - **Agent 2:** Alphabet agent with a character counter tool
    - **Agent 3:** Research assistant agent, which includes research and revision steps (this can be a loop until the
      research/revision step is satisfied).

The root agent acts as a coordinator agent, either delegating queries to the research agent when it receives
research-related queries or answering questions using the appropriate tool, such as the weather tool or the letter
counter tool.

- [gen-ai/adk_agents/agents/workflow_agent/agent.py at main · zekaryas1/gen-ai · GitHub](https://github.com/zekaryas1/gen-ai/blob/main/adk_agents/agents/workflow_agent/agent.py)

```python
root_agent = Agent(
    name="workflow_agent",
    model=AGENT_MODEL,
    instruction="""...instruction...""",
    description="An AI agent that coordinates user queries, delegating to tools for weather, letter counting, or research tasks.",
    sub_agents=[research_agent_loop],
    tools=[
        limited_weather_tool,
        letter_counter_tool
    ]
)
```

The research agent operates in a loop, drafting and refining the research. It begins by gathering information using
Google Search. Then, the refinement agent identifies areas where the research can be strengthened. This process
continues until the refinement agent determines there are no more areas to improve.

- There are two loop exit scenarios:
    - The refinement agent decides there are no further points to consider and calls the `exit_loop` tool.
    - The maximum iteration safeguard is reached, and the loop is terminated.

```python
research_agent = Agent(
    name="research_agent",
    model=AGENT_MODEL,
    instruction="""...instruction...""",
    description="An AI agent that reviews research drafts, suggests refinements, or signals completion when no further changes are needed.",
    tools=[exit_loop],
    output_key="refinement_point"
)


refinement_agent = Agent(
    name="refinement_agent",
    model=AGENT_MODEL,
    instruction="""...instruction...""",
    description="An AI agent that reviews research drafts, suggests refinements, or signals completion when no further changes are needed.",
    tools=[exit_loop],
    output_key="refinement_point"
)

research_agent_loop = LoopAgent(
    name="research_agent",
    sub_agents=[
        research_agent,
        refinement_agent
    ],
    max_iterations=5
)
```

This is some of the output I got.

```txt
Research quantum computing?
	- research agenbt: agent responds about quantum computing with Qubits, Applications and Current Status.

	- refinment agent: point to consider: Elaborate on specific examples of quantum algorithms and their advantages over classical algorithms.
	
	- research agent: adds more info with Shor's Algorithm, Grover's Algorithm, Quantum Approximate Optimization Algorithm (QAOA and Bernstein-Vazirani Algorithm

	- refinment agent: exits loop


- how many L are in hello?
	- There are two "L"s in the word "hello".

- what is the weather?
	- Please specify a city for the weather query.
	- new york
	- The weather in New York is sunny with a temperature of 25 degrees Celsius (77 degrees Fahrenheit).
```

## What Did I Build and How?

I wanted to build a non-technical solution for reading analytical information from data, particularly from CSV files.
It’s meant for people who might not be familiar with SQL or who want a simple solution.

You provide your query, such as “What is the most selling item?” or “What is the most expensive product?” in plain
English, and the agent writes the necessary SQL for you.

The agent doesn’t store anything. When the user provides a CSV file, we first analyze its structure and store it into a
local database such as SQLite.

Next time the user asks a question, we pass the database table schema to the LLM and ask it to generate a query. We then
run the query against the database and finally ask the LLM to generate a user-friendly answer.

- GitHub source code
  link: [gen-ai/adk_agents/agents/file_analytics_agents/agent.py at main · zekaryas1/gen-ai · GitHub](https://github.com/zekaryas1/gen-ai/blob/main/adk_agents/agents/file_analytics_agents/agent.py)

**Some further thinking:**

- This pattern is scalable: while we just used CSVs here, we could integrate with databases, Notion documents, or any
  other datastore the user might be using.
- The database should be read-only for security, so we do not allow deleting resources.

## What's next

Now that we have seen how to build agents, the next section will be how to secure them from prompt injection.

## Addition Resources

- [A practical guide to building agents by OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [Building Effective AI Agents \ Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
