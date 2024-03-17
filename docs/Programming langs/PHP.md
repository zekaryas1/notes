---
date created: Thursday, June 16th 2022, 1:47:45 pm
date modified: Sunday, March 17th 2024, 11:46:37 am
title: PHP Crash Note
---

# PHP Crash Note

## Printing

```php
echo "This is php";

print("This is PHP");
```

## Variables

mind the dollar sign ($)

```php
$text = "hello world";
$n = 5;
$y = 10.5;
$z = true;

echo $n;
```

### Print Datatype of Variable

```php
var_dump($n) // prints int(5)
```

#### Available Data-types

```php
Integer, Float, String, Booleans, Array, Object, resource and NULL
```

### Delete a Variable

```php
unset($z)
```

#### Check if Variable is Unset or Undefined

```php
if(!isset($z)){
	echo "we need var z";
}
```

### Constant Variable

```php
define("PI", 3.14);
echo PI;
```

## Control Flows

### == Vs ===

```php
// == checks value sequality
// === checks value and data type
$a = 0;
$b = '0';

assert($a == $b); //prints true
assert($a === $b); //prints false
```

### If/else

```php
#&&/|| C syntax
if(true && 14>12){
	print("here")
}else{
	print("else")
}
```

### Switch

```php
switch ($x) {
    case '0':
        print 'Switch does type coercion';
        break; // You must include a break, or you will fall through
               // to cases 'two' and 'three'
    case 'two':
    case 'three':
        // Do something if $variable is either 'two' or 'three'
        break;
    default:
        // Do something by default
}
```

### While

```php
$i = 0;
while ($i < 5) {
    echo $i++;
} // Prints "01234"
```

### For

```php
for ($x = 0; $x < 10; $x++) {
    echo $x;
}// Prints "0123456789"
```

### Foreach

```php
$my_array = [1,2];

// Foreach loops can iterate over arrays
foreach ($my_array as $array) {
    echo $array;
} // Prints "12"

$wheels = ['bicycle' => 2, 'car' => 4];

// You can iterate over the keys as well as the values
foreach ($wheels as $vehicle => $wheel_count) {
    echo "A $vehicle has $wheel_count wheels";
}
#A bicycle has 2 wheels
#A car has 4 wheels
```

## Data Structures

### Strings

```php
$country = "south africa";

ehco strlen($country);  //prints length of the string

echo strrev($country);  //returns reversesd string
```

### Array

```php
$my_array = [1,2,3,4]
echo $my_array;
```

```php
$my_array[] = 5 // add new array
unset($my_array[2]) // remove an array
count($my_array) //returns size of array
sort($array) //sorts the array
```

### Hashmap (associative array)

- All arrays in PHP are associative arrays (hashmaps in some languages)

```php
$associative = ['One' => 1, 'Two' => 2, 'Three' => 3];

echo $associative['One']; // prints 1

$associative['Four'] = 4; //Add an element
```

## Functions

### Define Function

```php
// Define a function with "function":
function my_function () {
    return 'Hello';
}
echo my_function(); // => "Hello"
```

### Function with Arguments

```php
function add ($x, $y = 1) { // $y is optional and defaults to 1
    $result = $x + $y;
    return $result;
}

echo add(4); // => 5
echo add(4, 2); // => 6
```

### Anonymous Functions

> Function is an object you can store, return or use it as a normal variable.

```php
$inc = function ($x) {
    return $x + 1;
};

echo $inc(2); // => 3
```

### Variable Arguments var_args

```php
function variable($word, ...$list) {
    echo $word . " || ";
    foreach ($list as $item) {
        echo $item . ' | ';
    }
}

variable("Separate", "Hello", "World");
//Separate || Hello | World |
```

## OOP

### Define Classes

```php
class Fruit {  
  // Properties  
  public $name;  
  public $color;  
  
  // Methods  
  function set_name($name) {  
    $this->name = $name;  
  }  
  function get_name() {  
    return $this->name;  
  }  
}  
```

### Objects

```php
$apple = new Fruit();  
$banana = new Fruit();  
$apple->set_name('Apple');  
$banana->set_name('Banana');  
  
echo $apple->get_name();  
echo $banana->get_name();

var_dump($apple instanceof Fruit);
```

### Constructor and Destructor

```php
class Fruit {  
  public $name;  
  public $color;  
  
  function __construct($name) {  
    $this->name = $name;  
  }

  function __destruct() {  
    echo "The fruit is going to heaven {$this->name}.";  
  }
  function get_name() {  
    return $this->name;  
  }  
}  
  
$apple = new Fruit("Apple");  
echo $apple->get_name();
```

### Access Modifiers

1. public
2. private
3. protected

### Inheritance

```php
class Animal{
	private $name;

	public function __construct($name){
		$this -> name = $name;
	}

	public function getName(){
		return $this->name;
	}
}

class Dog extends Animal{
	private $owner;

	public function __construct($name, $owner){
		parent::__construct($name);
		$this->owner = $owner;
	}

	public function getOwner(){
		return $this->owner;
	}

	//overriding
	public function getName(){
		return "Catch ".$this->name;
	}
}
```

### Static Modifier

```php
class Config{

	public static $DB_NAME = "DB_Name";

	public static function get_connection($host){
		return $host."/".Config::$DB_NAME;
	}

}

echo Config::$DB_NAME;
echo Config::get_connection("localhost");

```

### Interfaces

```php
interface IEngine{

	function start();
	    
	function stop();
	    
	function status();	 
}
	
class CarEngine implements IEngine{
	private $status = "Loading";
	  
	function start(){
		$this->status = "Running";
	}
	    
	function stop(){
		$this->status = "Resting";
	}	    
	    
	 function status(){
		return $this->status;
	}
	  
}	
	
$c = new CarEngine();
echo $c->status();  //loading
echo "\n";
$c->start();  //running
echo $c->status();
```

### Abstract

```php
abstract class Car {  
  public $name;  
  public function __construct($name) {  
    $this->name = $name;  
  }  
  abstract public function intro();  
}  
  
// Child classes  
class Audi extends Car {  
  public function intro() {  
    return "Choose German quality! I'm an $this->name!";  
  }  
}

$audi = new Audi("Audi");  
echo $audi->intro();
```

### Namespace, Typed-PHP…

- To be included…
