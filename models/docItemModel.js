const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocItemSchema = new Schema({
  docId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "docs",
    required: true,
  },
  lineNo: {
    type: Number,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: false,
  },
  ready: {
    type: Boolean,
    default: false,
  },
});

const DocItemsModel = mongoose.model("docItems", DocItemSchema);

module.exports = DocItemsModel;
