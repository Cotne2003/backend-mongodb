const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const logger = require("../utils/logger");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes");
  if (users.length >= 1) {
    res.send(users);
  } else {
    res.status(404).end();
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.send(user);
});

usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.status(204).end();
});

module.exports = usersRouter;
