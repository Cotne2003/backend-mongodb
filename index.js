const express = require("express");
const cors = require("cors");
const app = express();
const notesRouter = require("./controllers/notes");

app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("<h1>Notes app</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("started on 3000");
});
