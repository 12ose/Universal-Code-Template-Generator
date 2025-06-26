const pythonGenerator = require("./python");
const javaGenerator = require("./java");
const cppGenerator = require("./cpp");
const jsGenerator = require("./javascript");

function generateTemplate({ language, ...rest }) {
  switch (language.toLowerCase()) {
    case "python":
      return pythonGenerator(rest);
    case "java":
      return javaGenerator(rest);
    case "c++":
    case "cpp":
      return cppGenerator(rest);
    case "javascript":
    case "js":
      return jsGenerator(rest);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

module.exports = { generateTemplate };
