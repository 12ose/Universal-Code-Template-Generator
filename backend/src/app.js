const express = require("express");
const cors = require("cors");

const templateRouter = require("./routes/template");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/template", templateRouter);

app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({ error: err.message, details: err.details });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
