var express = require("express");
const UserModel = require("../models/userModel");
var router = express.Router();

/* GET users listing. */
router.get("/all", async (req, res, next) => {
  const users = await UserModel.find({ isAdmin: false });
  res.status(200).json({
    status: "success",
    users: users,
  });
});

router.get("/id/:id", async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    user: user,
  });
});

module.exports = router;
