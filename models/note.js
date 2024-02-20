const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../utils/config");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI);

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
