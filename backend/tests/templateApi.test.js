const request = require("supertest");
const app = require("../src/app");

describe("POST /api/v1/template", () => {
  it("generates Python template for Two Sum", async () => {
    const payload = {
      question_id: "two-sum",
      title: "Two Sum",
      description: "Given an integer array...",
      signature: {
        function_name: "twoSum",
        parameters: [
          { name: "nums", type: "int[]" },
          { name: "target", type: "int" },
        ],
        returns: { type: "int[]" },
      },
      language: "python",
    };
    const res = await request(app)
      .post("/api/v1/template")
      .send(payload)
      .expect(201);
    expect(res.body).toMatchSnapshot();
  });
});

describe("POST /api/v1/template - Required Scenarios", () => {
  const scenarios = [
    {
      name: "Fibonacci (Python)",
      payload: {
        question_id: "fibonacci",
        title: "Fibonacci",
        description: "Compute the nth Fibonacci number.",
        signature: {
          function_name: "fibonacci",
          parameters: [{ name: "n", type: "int" }],
          returns: { type: "int" },
        },
        language: "python",
      },
    },
    {
      name: "MergeKLists (Java)",
      payload: {
        question_id: "merge-k-lists",
        title: "Merge K Lists",
        description:
          "Merge k sorted linked lists and return it as one sorted list.",
        signature: {
          function_name: "mergeKLists",
          parameters: [{ name: "lists", type: "List<int[]>" }],
          returns: { type: "List<int>" },
        },
        language: "java",
      },
    },
    {
      name: "LowestCommonAncestor (C++)",
      payload: {
        question_id: "lowest-common-ancestor",
        title: "Lowest Common Ancestor",
        description:
          "Find the lowest common ancestor of two nodes in a binary tree.",
        signature: {
          function_name: "lowestCommonAncestor",
          parameters: [
            { name: "root", type: "Tree<int>" },
            { name: "p", type: "Tree<int>" },
            { name: "q", type: "Tree<int>" },
          ],
          returns: { type: "Tree<int>" },
        },
        language: "cpp",
      },
    },
    {
      name: "DetectCycle (JavaScript)",
      payload: {
        question_id: "detect-cycle",
        title: "Detect Cycle",
        description: "Detect if a cycle exists in a graph.",
        signature: {
          function_name: "detectCycle",
          parameters: [{ name: "graph", type: "Graph" }],
          returns: { type: "bool" },
        },
        language: "javascript",
      },
    },
    {
      name: "Fibonacci (Java)",
      payload: {
        question_id: "fibonacci",
        title: "Fibonacci",
        description: "Compute the nth Fibonacci number.",
        signature: {
          function_name: "fibonacci",
          parameters: [{ name: "n", type: "int" }],
          returns: { type: "int" },
        },
        language: "java",
      },
    },
    {
      name: "Fibonacci (C++)",
      payload: {
        question_id: "fibonacci",
        title: "Fibonacci",
        description: "Compute the nth Fibonacci number.",
        signature: {
          function_name: "fibonacci",
          parameters: [{ name: "n", type: "int" }],
          returns: { type: "int" },
        },
        language: "cpp",
      },
    },
    {
      name: "Fibonacci (JavaScript)",
      payload: {
        question_id: "fibonacci",
        title: "Fibonacci",
        description: "Compute the nth Fibonacci number.",
        signature: {
          function_name: "fibonacci",
          parameters: [{ name: "n", type: "int" }],
          returns: { type: "int" },
        },
        language: "javascript",
      },
    },
  ];

  scenarios.forEach(({ name, payload }) => {
    it(`generates template for ${name}`, async () => {
      const res = await request(app)
        .post("/api/v1/template")
        .send(payload)
        .expect(201);
      expect(res.body).toMatchSnapshot();
    });
  });

  it("generates Python template for function with multiple return values", async () => {
    const payload = {
      question_id: "minmax",
      title: "Find Min and Max",
      description: "Return the minimum and maximum of an array.",
      signature: {
        function_name: "findMinMax",
        parameters: [{ name: "arr", type: "int[]" }],
        returns: [
          { name: "min", type: "int" },
          { name: "max", type: "int" },
        ],
      },
      language: "python",
    };
    const res = await request(app)
      .post("/api/v1/template")
      .send(payload)
      .expect(201);
    expect(res.body).toMatchSnapshot();
  });
});
