# Universal Code Template Generator – Design Document

## Overview

This project provides a production-ready HTTP API and frontend UI for generating language-agnostic, runnable code templates ("starter code") for DSA problems, similar to LeetCode or HackerRank. It supports Java 17, Python 3.12, C++20, and JavaScript (Node 20), and is designed for extensibility and maintainability.

---

Follow these steps to run the project locally:

1. **Clone the repository**

2. **Install dependencies**

   ```sh
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Start the backend server**

   ```sh
   cd backend && npm run start
   ```

4. **Start the frontend app**

   ```sh
   cd frontend && npm run start
   ```

5. **Access the application**
   - Open your browser and go to [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

---

## Architecture

### High-Level Diagram

```
  [Express.js Backend API] <--> [Frontend React App] <--> [Template Generators]
```

- **Backend (Node.js/Express):**

  - Exposes `POST /api/v1/template` endpoint.
  - Validates payloads using Zod schemas.
  - Delegates template generation to language-specific modules.
  - Returns a compilable/runnable code template, hiding all I/O and boilerplate.

- **Frontend (React):**

  - Collects problem metadata, function signature, and target language from the user.
  - Sends a POST request to the backend and displays the generated template.
  - Responsive, modern UI/UX with support for multiple parameters and return values.

- **Template Generators:**
  - One module per language (e.g., `python.js`, `java.js`, etc.).
  - Map DSL types to idiomatic types for each language.
  - Generate code with correct function/class signatures, I/O, and entrypoint.

---

## Template Generation Strategy

- **Input DSL:**

  - Uses a mini-DSL for type signatures (e.g., `int[]`, `List<int>`, `Tree<int>`, `Graph`).
  - Supports multiple parameters (primitive and complex types) and multiple return values.

- **Type Mapping:**

  - Centralized in `typeMapping.js`.
  - Ensures idiomatic type usage for each language (e.g., `int[]` → `List<Integer>` in Java).

- **Boilerplate Hiding:**

  - Each template includes all necessary imports, class/function definitions, and main/entrypoint code.
  - User only needs to implement the core logic.

- **Multiple Return Values:**

  - Python: Tuple return type.
  - Java: Custom `Result` class.
  - C++: Custom `struct Result`.
  - JavaScript: Object return.

- **Complex Types:**

  - Comments and stubs are included for types like `Tree` and `Graph` to guide the user.

- **Validation:**
  - Zod schemas ensure payloads are well-formed.
  - Returns HTTP 400 with detailed error messages for invalid input.

---

## Extensibility & Future Directions

- **Adding New Languages:**

  - Add a new generator module (e.g., `go.js`, `rust.js`).
  - Update `typeMapping.js` with new type mappings.
  - Register the new generator in `generators/index.js`.

- **Custom Type Support:**

  - Extend the DSL and type mapping to support new data structures (e.g., LinkedList, Heap).
  - Add serialization/deserialization helpers for complex types.

- **Frontend Enhancements:**

  - Add code preview with syntax highlighting.
  - Allow users to download templates or copy to clipboard.
  - Add onboarding tips, tooltips, or code examples.

- **Security & Productionization:**

  - Add rate limiting, logging, and authentication as needed.
  - Containerize with Docker for deployment.
  - Add monitoring and error tracking.

- **Automated Testing:**

  - Snapshot tests for all supported languages and scenarios.
  - Add integration tests for the full API flow.

- **Code Execution (Optional):**
  - Integrate with a sandboxed code runner for live code execution/testing.

---

<!-- ## Summary

This system is modular, extensible, and production-ready. It enables content authors and platform developers to generate high-quality, idiomatic starter code for a wide range of DSA problems, with minimal effort and maximum flexibility. -->
