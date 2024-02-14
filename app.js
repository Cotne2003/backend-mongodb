const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Notes app</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.post("/api/notes", (req, res) => {
  body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id).then((deletedNote) => {
    if (deletedNote) {
      res.status(204).end();
    } else {
      console.log("error");
    }
  });
});

app.put("/api/notes/:id", (req, res) => {});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("started on 3000");
});
