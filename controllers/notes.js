const express = require("express");
const Note = require("../models/note");

const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.post("/", async (req, res, next) => {
  body = req.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  const savedNote = await note.save();
  res.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (req, res, next) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

notesRouter.put("/:id", (req, res) => {});

module.exports = notesRouter;
