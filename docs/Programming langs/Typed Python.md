---
title: Typed Python
date created: Sunday, September 7th 2025, 7:28:55 pm
date modified: Monday, September 8th 2025, 1:07:09 pm
---

# Typed Python

- **Python is a dynamically typed language:**
	- Meaning variables do not have a fixed type and can hold values of any type (e.g., str, int, bool, etc.) without explicit declaration.
	- The type of variable is determined at runtime based on the value assigned to it, and it can change if a new value of a different type is assigned.
- **Python’s type hints:**
	- Introduced via the typing module (PEP 484), allow developers to annotate variables, function parameters, and return types to indicate expected types.
- **Type hints are for Dev UX**:
	- Type hints in Python are primarily for developer experience and tooling support (e.g., IDEs, linters, or static type checkers).
	- They do not affect the runtime behavior of Python code, as Python remains dynamically typed at runtime. Type hints are optional and ignored by the Python interpreter.
- **Python modern type checkers:**
	- [facebook/pyrefly: A fast type checker and IDE for Python](https://github.com/facebook/pyrefly)
	- [astral-sh/ty: An extremely fast Python type checker and language server, written in Rust.](https://github.com/astral-sh/ty)
- **Python Runtime validation**:
	- [Pydantic](https://docs.pydantic.dev/latest/)
		- A third-party library designed for data validation and serialization using type hints.
		- Focuses on runtime data validation, parsing, and automatic conversion of data, often used in APIs and data processing.
- **Python 3.9+:**
	- This note is for python 3.9 and above

## Primitives

```python
a: int = 1
b: float = 1.0
c: bool = True
d: str = "test"
e: bytes = b"test"
```

- Any type
	- The Any type from the typing module can be used when a variable’s type is unknown or can be any type.

```python
from typing import Any

x: Any = 12
x = [12]
```

### Final Type

- Indicates that a variable or attribute should not be reassigned after initialization.

```python
from typing import Final

MAX_RETRIES: Final[int] = 5  # Cannot be reassigned
MAX_RETRIES = 12 #error
```

## Collections

```python
a: list[int] = [1]
b: set[int] = {6, 7}
c: dict[str, float] = {"field": 2.0}

# For tuples of fixed size
d: tuple[int, str, float] = (3, "yes", 7.5)
# For tuples of variable size, we use one type and ellipsis
e: tuple[int, ...] = (1, 2, 3)
```

### TypedDict

- TypedDict lets you give precise types for dictionaries that represent objects with a fixed schema, such as `{'id': 1, 'items': ['x']}`.

```python
from typing import TypedDict

Movie = TypedDict('Movie', {'name': str, 'year': int})

movie1: Movie = {'name': 'Blade Runner', 'year': 1982}

movie2: Movie = {'title': 'Blade Runner', 'year': 1982} #error

movie3: Movie = {'name': 'Blade Runner', 'year': 1982, "chart": 12} #error
```

## Union Type

- use the | operator when something could be one of a few types

```python
a: str | None = "something" if some_condition() else None

b: list[int | str] = [3, 5, "test", "fun"]

address: str | list[str] = ["12", "13"]
```

## Literal Type

- using literal types you can allow an exact value which a string, number, or boolean must have.

```python
from typing import Literal

type Style = Literal["italic", "bold", "underline"]

def with_style(line: str, word: str, style: Style):
	pass

with_style("ty is a fast type checker for Python.", "fast", "underline")
```

```python
from typing import Literal

PrimaryColors = Literal["red", "blue", "yellow"]
SecondaryColors = Literal["purple", "green", "orange"]
AllowedColors = Literal[PrimaryColors, SecondaryColors]

a: AllowedColors = "red" #can be any of the 6 colors
b: tuple[PrimaryColors, SecondaryColors] = ("red", "green") 
```

## Optional Type

- The Optional type, indicates that a value can be of a specified type or None. It’s a shorthand for `Union[T, None]`.

```python
from typing import Optional

def get_name(user_id: int) -> Optional[str]:
    return "Alice" if user_id == 1 else None
```

## Type Aliases

- To create custom names for complex types, improving code readability and reusability.

```python
# Type alias for a list of dictionaries
UserData = list[dict[str, int]]

sample = {"12": 12}
a: UserData = [sample, {}]
```

## Functions

```python
# This is how you annotate a function definition(params and return type)
def stringify(num: int) -> str:
    return str(num)


# If a function does not return a value, use None as the return type
# Default value for an argument goes after the type annotation
def show(value: str, excitement: int = 10) -> None:
    print(value + "!" * excitement)
```

### No Return

- Improves type safety by explicitly marking unreachable code paths or functions that don’t return.

```python
from typing import NoReturn

def exit_with_error(message: str) -> NoReturn:
    print(f"Error: {message}")
    exit(1)
```

### Callbacks or Anonymous Functions

- Use Callable when annotating function parameters or variables that store functions.
	- Syntax: `[[param1, param2…], return_type]`

```python
from typing import Callable

def apply_function(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

def add(x: int, y: int) -> int:
    return x + y

result = apply_function(add, 3, 4)  # Output: 7
```

## Classes

```python
class BankAccount:
	pass

account: BankAccount = BankAccount("Alice", 400)
```

### Dataclasses

- Best for lightweight data models with static typing; minimal boilerplate, no runtime validation.
- Auto-generates __init__, __repr__, __eq__, etc., reducing boilerplate.

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: Optional[str] = None

user = User(id=1, name="Alice")  # No validation; direct assignment
print(user)  # User(id=1, name='Alice', email=None)
```

## Pydantic

- [Welcome to Pydantic - Pydantic](https://docs.pydantic.dev/latest/#pydantic-examples)
- Automatically validates data based on type annotations and supports advanced features like custom validators.
- Enforces type hints at runtime, raising ValidationError for invalid data.

```python
from pydantic import BaseModel, validator
from typing import Optional

class User(BaseModel):
    id: int
    name: str
    email: Optional[str] = None

    @validator("name")
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v:
            raise ValueError("Name cannot be empty")
        return v

user = User(id="1", name="Alice")  # Converts id to int, validates name
print(user.dict())  # {'id': 1, 'name': 'Alice', 'email': None}
print(user.json())  # {"id": 1, "name": "Alice", "email": null}
```
