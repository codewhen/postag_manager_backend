const DocItemsModel = require("../models/docItemModel");
const DocModel = require("../models/docModel");
const UserModel = require("../models/userModel");
const { PythonShell } = require("python-shell");

exports.addNewDoc = async (req, res) => {
  if (!req.body.docName || !req.body.input) {
    return res.status(400).json({
      message: "docName or input is missing in body",
    });
  }
  try {
    const doc = await DocModel.create({ docName: req.body.docName });
    const replacedInput = req.body.input.replaceAll("|", "।");
    const items = replacedInput.split("।");
    let itemsParsed = [];
    for (let i = 0; i < items.length; i++) {
      if (!items[i]) {
        continue;
      }
      const itemP = await DocItemsModel.create({
        docId: doc._id,
        input: items[i].trim(),
        lineNo: i + 1,
      });
      itemsParsed.push(itemP);
    }
    return res.status(200).json({
      success: true,
      doc: doc,
      items: itemsParsed,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.submitPossedItemDoc = async (req, res) => {
  if (!req.body.output) {
    return res.status(400).json({
      message: "output is missing in body",
    });
  }
  try {
    const item = await DocItemsModel.updateOne(
      { _id: req.params.id },
      { output: req.body.output }
    );
    return res.status(200).json({
      success: true,
      item: item,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.rearrangeDocItems = async (req, res) => {
  try {
    const items = await DocItemsModel.find({ docId: req.params.id }).sort({
      lineNo: "asc",
    });
    const doc = await DocModel.findById(req.params.id);
    parsedInput = [];
    parsedOutput = [];
    for (const item of items) {
      parsedInput.push(item.input);
      if (item.output) {
        parsedOutput.push(item.output);
      }
    }

    parsedInputStr = parsedInput.join("। ");
    if (parsedInputStr) {
      parsedInputStr += "।";
    }
    parsedOutputStr = parsedOutput.join("। ");
    if (parsedOutputStr) {
      parsedOutputStr += "।";
    }

    return res.status(200).json({
      success: true,
      input: parsedInput,
      inputStr: parsedInputStr,
      output: parsedOutput,
      outputStr: parsedOutputStr,
      doc: doc,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.getAllDocs = async (req, res) => {
  try {
    const docs = await DocModel.find();
    return res.status(200).json({
      docs: docs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.fetchAssignReqForDoc = async (req, res) => {
  try {
    // const userId = req.user._id;
    const docId = req.params.docId;
    let frameSize = 5;

    const users = await UserModel.find();
    console.log(users);
    const docs = await DocItemsModel.find({ assignedTo: null, docId: docId });

    if (docs.length < frameSize) {
      frameSize = docs.length;
    }

    let count = 0;
    let userIndx = 0;

    for (const doc of docs) {
      await DocItemsModel.updateOne(
        { _id: doc._id },
        { assignedTo: users[userIndx]._id }
      );
      if (count < frameSize) {
        count++;
      } else {
        count = 0;
        if (users.length > userIndx + 1) {
          userIndx++;
        } else {
          break;
        }
      }
    }

    return res.status(200).json({
      docs: docs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.getAssignedOfAUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const docs = await DocItemsModel.find({ assignedTo: userId });
    return res.status(200).json({
      docs: docs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};

exports.wordTokenise = async (req, res) => {
  try {
    const sentence = req.body.input;

    let options = {
      mode: "json",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "scripts", //If you are having python_test.py script in same folder, then it's optional.
      args: [sentence], //An argument which can be accessed in the script using sys.argv[1]
    };

    PythonShell.run("tokeniser.py", options, function (err, result) {
      if (err) throw err;
      // result is an array consisting of messages collected
      //during execution of script.
      console.log("result: ", result);
      res.send(result);
    });

    // return res.status(200).json({
    //   output: output,
    // });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  }
};
