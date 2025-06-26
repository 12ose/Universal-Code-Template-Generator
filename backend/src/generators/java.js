const { getTypeMapping } = require("../typeMapping");

function javaGenerator({ signature }) {
  const fnName = signature.function_name;
  const params = signature.parameters
    .map((p) => `${getTypeMapping("java", p.type)} ${p.name}`)
    .join(", ");

  let returnType;
  let resultClass = "";
  let returnHint = "";
  if (Array.isArray(signature.returns)) {
    returnType = "Result";
    resultClass = `class Result {\n${signature.returns
      .map((r) => `    public ${getTypeMapping("java", r.type)} ${r.name};`)
      .join("\n")}\n}`;
    returnHint = `// Returns: Result object with fields (${signature.returns
      .map((r) => r.name + ": " + getTypeMapping("java", r.type))
      .join(", ")})\n    `;
  } else {
    returnType = getTypeMapping("java", signature.returns.type);
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

  const template = `import java.util.*;\nimport com.fasterxml.jackson.databind.*;\n\n${
    resultClass ? resultClass + "\n\n" : ""
  }public class Solution {\n    public ${returnType} ${fnName}(${params}) {\n        ${returnHint}${complexHint}        // Write your logic here\n        return null;\n    }\n\n    public static void main(String[] args) throws Exception {\n        // Do not edit below this line\n        ObjectMapper mapper = new ObjectMapper();\n        Map<String, Object> data = mapper.readValue(System.in, Map.class);\n        Solution sol = new Solution();\n        System.out.println(mapper.writeValueAsString(sol.${fnName}(/* unpack data here */)));\n    }\n}\n`;

  return {
    language: "java",
    template,
  };
}

module.exports = javaGenerator;
