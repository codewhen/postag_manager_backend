var express = require("express");
const DocItemsModel = require("../models/docItemModel");
const DocModel = require("../models/docModel");
var router = express.Router();
const DocController = require("../controller/docController");
const passport = require("passport");

router.post("/add", DocController.addNewDoc);
router.post("/tag/:id", DocController.submitPossedItemDoc);
router.post("/rearrange/:id", DocController.rearrangeDocItems);
router.get("/tag/", DocController.getAllDocs);
router.get(
  "/fetchAssign/:docId",
  passport.authenticate("jwt", { session: false }),
  DocController.fetchAssignReqForDoc
);

router.get(
  "/assigned/self",
  passport.authenticate("jwt", { session: false }),
  DocController.getAssignedOfAUser
);
router.post("/word-tokenisation/", DocController.wordTokenise);

router.post("/markedReady", DocController.markedReadySeq);

module.exports = router;
