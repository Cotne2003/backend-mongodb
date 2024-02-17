const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("strictQuery", false);

const password = "mongo-password";

const url = `mongodb+srv://Cotniko:${password}@cluster0.kf8vzki.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new Schema({
  content: String,
  important: Boolean,
  date: Date,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
