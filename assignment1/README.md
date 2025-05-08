## Interfaces vs. Types: Key Differences

While both define object structures, here's a quick rundown of their distinctions:

- **Declaration Merging:** Interfaces can be declared multiple times, and their members are merged by the compiler. Types do not support this.
- **Primitive Aliases:** Types can create aliases for primitive types (`string`, `number`), unions, and intersections. Interfaces primarily describe object structures.
- **Tuples:** Types can define tuple types (fixed-length arrays with specific element types). Interfaces cannot directly represent tuples.
- **`implements` Keyword:** Classes use `implements` to adhere to an interface contract. While classes can satisfy type aliases, `implements` specifically works with interfaces.

**In essence:** Use interfaces for defining object shapes where you might benefit from declaration merging. Use types for more versatile type aliasing, including primitives and complex combinations.

## Unleashing Union (`|`) and Intersection (`&`) Types

TypeScript allows you to create more flexible and precise type definitions using union and intersection types.

**Union Type: "OR" Logic**

A union type specifies that a variable can hold one of several possible types.

```typescript
type Status = "success" | "error" | "pending";

interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.error("Error:", response.message);
  }
}
```
