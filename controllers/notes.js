const express = require("express");
const Note = require("../models/note");

const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

notesRouter.get("/:id", (req, res) => {
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

notesRouter.post("/", (req, res) => {
  body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note.save().then((savedNote) => {
    res.status(201).json(savedNote);
  });
});

notesRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id).then((deletedNote) => {
    if (deletedNote) {
      res.status(204).end();
    } else {
      console.log("error");
    }
  });
});

notesRouter.put("/:id", (req, res) => {});

module.exports = notesRouter;
