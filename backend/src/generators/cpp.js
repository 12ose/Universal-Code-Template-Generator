const { getTypeMapping } = require("../typeMapping");

function cppGenerator({ signature }) {
  const fnName = signature.function_name;
  const params = signature.parameters
    .map((p) => `${getTypeMapping("cpp", p.type)} ${p.name}`)
    .join(", ");

  let returnType;
  let resultStruct = "";
  let returnHint = "";
  if (Array.isArray(signature.returns)) {
    returnType = "Result";
    resultStruct = `struct Result {\n${signature.returns
      .map((r) => `    ${getTypeMapping("cpp", r.type)} ${r.name};`)
      .join("\n")}\n};`;
    returnHint = `// Returns: Result struct with fields (${signature.returns
      .map((r) => r.name + ": " + getTypeMapping("cpp", r.type))
      .join(", ")})\n        `;
  } else {
    returnType = getTypeMapping("cpp", signature.returns.type);
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
            `        // ${p.name} is a complex type (${p.type}). You may need to deserialize or construct it manually.`
        )
        .join("\n") + "\n";
  }

  const template = `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n${
    resultStruct ? resultStruct + "\n\n" : ""
  }class Solution {\npublic:\n    ${returnType} ${fnName}(${params}) {\n        ${returnHint}${complexHint}        // Write your logic here\n    }\n};\n\nint main() {\n    // Do not edit below this line\n    // Read input from stdin and call Solution().${fnName}()\n    return 0;\n}\n`;

  return {
    language: "cpp",
    template,
  };
}

module.exports = cppGenerator;
