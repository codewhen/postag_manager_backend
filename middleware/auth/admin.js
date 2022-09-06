const UserModel = require("../../models/userModel");

exports.mustAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "user not found" });
  }
  const user = await UserModel.findById(req.user._id);
  console.log("user");
  console.log(req.user);
  const isAdmin = user.isAdmin;
  if (!isAdmin) {
    return res.status(401).json({ message: "user is not admin" });
  }

  console.log("passed");

  return next();
};
