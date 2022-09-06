var express = require("express");
const UserModel = require("../models/userModel");
var router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const users = await UserModel.find({ isAdmin: false });
    res.status(200).json({
      status: "success",
      users: users,
    });
  }
);

router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      user: user,
    });
  }
);

module.exports = router;
