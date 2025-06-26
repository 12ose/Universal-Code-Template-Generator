const { z } = require("zod");

const parameterSchema = z.object({
  name: z.string(),
  type: z.string(),
});

const signatureSchema = z.object({
  function_name: z.string(),
  parameters: z.array(parameterSchema),
  returns: z.union([
    z.object({ type: z.string() }),
    z.array(z.object({ name: z.string(), type: z.string() })),
  ]),
});

const templateRequestSchema = z.object({
  question_id: z.string(),
  title: z.string(),
  description: z.string(),
  signature: signatureSchema,
  language: z.string(),
});

module.exports = { templateRequestSchema };
