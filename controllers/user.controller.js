const bcrypt = require("bcrypt");

exports.create = (req, res, next) => {
  try {
    if (!req.body.email) {
      req.flash("info", "Email can not be empty!");
      return res.redirect("/login-view");
    }

    if (!req.body.password) {
      req.flash("info", "Password can not be empty!");
      return res.redirect("/login-view");
    }
  } catch (err) {
    next(err);
  }
};
