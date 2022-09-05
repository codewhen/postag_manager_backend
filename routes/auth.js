var express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var router = express.Router();
const UserModel = require("../models/userModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "GUIDE API: Auth" });
});

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    const data = req.body;

    const user = await UserModel.create({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    const body = { _id: user._id, email: user.email };
    const token = jwt.sign({ user: body }, "TOP_SECRET");

    res.json({
      message: "Signup successful",
      user: user,
      token: token,
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token, user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
