const express = require("express");
const cors = require("cors");
const app = express();
const notesRouter = require("./controllers/notes");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("<h1>Notes app</h1>");
  console.log("test");
});

app.listen(config.PORT, () => {
  logger.info(`started on ${config.PORT}`);
});

module.exports = app;
