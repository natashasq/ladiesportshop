const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validationResult } = require("express-validator");

exports.loginView = (req, res) => {
  return res.render("login");
};

exports.signupView = (req, res) => {
  return res.render("signup");
};

exports.login = (req, res) => {
  req.session.user_id = res.locals.user.user_id;
  return res.redirect("/");
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const getValidationMsg = (param, message) => {
    switch (param) {
      case "email":
        return "This email is not correct.";
      case "password":
        return "Minimum password length is 5 characters.";
      case "confirm_password":
        return `${message}`;
      default:
        return "";
    }
  };
  if (!errors.isEmpty()) {
    req.flash(
      "info",
      getValidationMsg(errors.array()[0].param, errors.array()[0].msg)
    );
    return res.redirect("/signup-view");
  }

  try {
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 12),
      phone: req.body.phone,
      street_name: req.body.street_name,
      postal_code: req.body.postal_code,
      city: req.body.city,
    });

    await User.create(user);
    return res.redirect("/login-view");
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy();
    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};
