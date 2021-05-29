const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email) {
      req.flash("info", "Email can not be empty!");
      return res.redirect("/login-view");
    }

    if (!req.body.password) {
      req.flash("info", "Password can not be empty!");
      return res.redirect("/login-view");
    }

    const [user] = await User.findOne(req.body.email);

    if (!Boolean(user)) {
      req.flash("info", "User not found!");
      return res.redirect("/login-view");
    }

    const passwordDataIsValid = await bcrypt.compare(
      req.body?.password,
      user?.password
    );

    if (!passwordDataIsValid) {
      req.flash("info", "Password is not correct!");
      return res.redirect("/login-view");
    }
    console.log(user);
    res.locals.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    if (!req.body.first_name) {
      req.flash("info", "First name can not be empty!");
      return res.redirect("/signup-view");
    }

    if (!req.body.last_name) {
      req.flash("info", "Last name can not be empty!");
      return res.redirect("/signup-view");
    }

    if (!req.body.email) {
      req.flash("info", "Email can not be empty!");
      return res.redirect("/signup-view");
    }

    if (!req.body.password) {
      req.flash("info", "Password can not be empty!");
      return res.redirect("/signup-view");
    }

    next();
  } catch (err) {
    next(err);
  }
};

exports.checkForLogIn = async (req, res, next) => {
  try {
    if (!req.session.user_id) {
      return res.redirect("/login-view");
    }
    next();
  } catch (err) {
    next(err);
  }
};
