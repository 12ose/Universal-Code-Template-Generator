const express = require("express");
const { templateRequestSchema } = require("../validators/templateSchema");
const { generateTemplate } = require("../generators");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const parseResult = templateRequestSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid request payload",
        details: parseResult.error.errors,
      });
    }
    try {
      const result = generateTemplate({
        ...parseResult.data,
        signature: parseResult.data.signature,
      });
      res.status(201).json(result);
    } catch (err) {
      if (err.message.startsWith("Unsupported language")) {
        return res.status(400).json({ error: err.message });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
