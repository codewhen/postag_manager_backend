var express = require("express");
const DocItemsModel = require("../models/docItemModel");
const DocModel = require("../models/docModel");
var router = express.Router();
const DocController = require("../controller/docController");
const passport = require("passport");
const { mustAdmin } = require("../middleware/auth/admin");

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  DocController.addNewDoc
);
router.post("/tag/:id", DocController.submitPossedItemDoc);
router.post("/rearrange/:id", DocController.rearrangeDocItems);
router.get("/tag/", DocController.getAllDocs);
router.get(
  "/assign/self",
  passport.authenticate("jwt", { session: false }),
  DocController.assignReqForUser
);
router.get(
  "/assign/:docId",
  passport.authenticate("jwt", { session: false }),
  DocController.assignReqForDoc
);

router.get(
  "/assigned/self",
  passport.authenticate("jwt", { session: false }),
  DocController.getAssignedOfAUser
);

router.get(
  "/analytics/userwise",
  passport.authenticate("jwt", { session: false }),
  mustAdmin,
  DocController.getAnalyticsUserWise
);
router.post("/word-tokenisation/", DocController.wordTokenise);

router.post("/markedReady", DocController.markedReadySeq);

module.exports = router;
