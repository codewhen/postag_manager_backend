const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocSchema = new Schema({
  docName: {
    type: String,
    required: true,
  },
});

const DocModel = mongoose.model("docs", DocSchema);

module.exports = DocModel;
