const { getTypeMapping } = require("../typeMapping");

function jsGenerator({ signature }) {
  const fnName = signature.function_name;
  const params = signature.parameters.map((p) => p.name).join(", ");
  let jsdocParams = signature.parameters
    .map((p) => ` * @param {${getTypeMapping("javascript", p.type)}} ${p.name}`)
    .join("\n");
  let jsdocReturn;
  let returnHint = "";
  if (Array.isArray(signature.returns)) {
    jsdocReturn = ` * @returns {{ ${signature.returns
      .map((r) => `${r.name}: ${getTypeMapping("javascript", r.type)}`)
      .join(", ")} }}`;
    returnHint = `// Returns: object with fields (${signature.returns
      .map((r) => r.name + ": " + getTypeMapping("javascript", r.type))
      .join(", ")})\n    `;
  } else {
    jsdocReturn = ` * @returns {${getTypeMapping(
      "javascript",
      signature.returns.type
    )}}`;
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
            `    // ${p.name} is a complex type (${p.type}). You may need to deserialize or construct it manually.`
        )
        .join("\n") + "\n";
  }

  const template = `/**\n${jsdocParams}\n${jsdocReturn}\n */\nclass Solution {\n  ${fnName}(${params}) {\n    ${returnHint}${complexHint}    // Write your logic here\n  }\n}\n\nif (require.main === module) {\n  const fs = require('fs');\n  const data = JSON.parse(fs.readFileSync(0, 'utf-8'));
  console.log(JSON.stringify(new Solution().${fnName}(...Object.values(data))));\n}\n`;

  return {
    language: "javascript",
    template,
  };
}

module.exports = jsGenerator;
