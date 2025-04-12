# bocchi-the-programming
bocchi the programming! - new language project

# concept
- having a grammar similar to python
- However, the system is programmable, so the OS can be developed
- Prioritizes time complexity over space complexity
- Strength in string processing.
- Adopts a value-centric memory model even at the cost of some overhead.
- Value structure (pseudo written by C)
```c
struct Value {
    void* ptr;           // Pointer to the data or function code
    void* ptr2;          // Auxiliary pointer (e.g., for map key arrays, closure captures, etc.)

    uint64_t type;        // Type of the value (e.g., int8, uint32, list, map, string, function, etc.)
    uint64_t origin;      // Memory origin (STACK, GC_HEAP, GLOBAL_HEAP, STATIC, CODE)
    uint64_t is_ref;      // Reference flag (1 if it's a reference and should not be deallocated)

    uint64_t length;     // Logical length (e.g., for lists/strings), or the actual value for integers
    uint64_t capacity;   // Capacity for array-like structures
};
```
- Memory Area
  - STACK: Stack frames for local variables and function calls
  - GC_HEAP: Heap managed by GC on a per-main_loop basis
  - GLOBAL_HEAP: Global heap, persists independently of the loop
  - STATIC: Fixed resources that require explicit deallocation
  - CODE_EXEC: Executable code area (populated after user code is compiled)
  - CODE_LIBRARY: Code space for dynamically loadable/unloadable library functions
- This structure enables real-time monitoring of memory allocation status.
- UTF-32 is used to prioritize efficiency in string processing.
- Functions are version-controlled individually by default, and the CODE_LIBRARY area is designed to support downloading from the internet in the future.
- Provides built-in linear memory structures: dequeue, list, map, and set.
- Defaults to a 64-bit architecture.
- The language includes its own compiler, allowing dynamic compilation and library registration.
```
  register_function("math", "sqrt", "1.0.0", "def add(a, b):\n\treturn a + b")
```
- Primitive data types (all types are 'Value' structure)
  - bool
  - int8,  uint8
  - int16, uint16
  - int32, uint32
  - int64, uint64
  - float32, float64
  - char  # UTF-32
  - str  # UTF-32, not null-terminated
- Pseudo code for language flow
```
[Program Start]
→ Load static/global resources
→ while (main_loop() == true):
      - Execute main_loop()
      - Clear temp heap (GC heap)
→ Check unfreed static memory
→ Exit
```



# syntax example
```
def add(a, b):
    return a + b

def greet(name):
    return f"Hello, {name}!"

# If return true, It continues loop.
# Automatically progress the garbage collection at the end of the loop.
def main_loop():
    sqrt = import_function("math", "sqrt", "1.0.0")
    num1 = sqrt(100)
    num2 = 20
    result = add(num1, num2)
    print("The sum is: ", result)

    print(greet("Bocchi"))
    
    # Static variable check
    static_var = alloc("I'm a static variable.")
    return false

```
