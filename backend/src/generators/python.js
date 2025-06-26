const { getTypeMapping } = require("../typeMapping");

function pythonGenerator({ signature }) {
  const fnName = signature.function_name;
  const params = signature.parameters
    .map((p) => `${p.name}: ${getTypeMapping("python", p.type)}`)
    .join(", ");

  let returnType;
  let returnHint = "";
  if (Array.isArray(signature.returns)) {
    returnType = `[${signature.returns
      .map((r) => getTypeMapping("python", r.type))
      .join(", ")}]`;
    returnHint = `# Returns: tuple (${signature.returns
      .map((r) => r.name + ": " + getTypeMapping("python", r.type))
      .join(", ")})\n    `;
  } else {
    returnType = getTypeMapping("python", signature.returns.type);
  }

  const complexTypes = signature.parameters.filter((p) =>
    ["Tree<int>", "Tree", "Graph"].includes(p.type)
  );
  let complexHint = "";
  if (complexTypes.length > 0) {
    complexHint =
      complexTypes
        .map(
          (p) =>
            `        # ${p.name} is a complex type (${p.type}). You may need to deserialize or construct it manually.`
        )
        .join("\n") + "\n";
  }

  const template = `class Solution:\n    def ${fnName}(self, ${params}) -> ${returnType}:\n        ${returnHint}${complexHint}        # Write your logic here\n        pass\n\nif __name__ == "__main__":\n    # Do not edit below this line\n    import sys, json\n    data = json.loads(sys.stdin.read())\n    print(json.dumps(Solution().${fnName}(**data)))\n`;

  return {
    language: "python",
    template,
  };
}

module.exports = pythonGenerator;
