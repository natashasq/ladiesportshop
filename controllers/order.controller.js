const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.order = async (req, res, next) => {
  try {
    const countArr = await Cart.count(req.session.user_id);
    const count = countArr.map((count) => count.count);

    const oneUser = await User.findById(req.params.user_id);
    const user = oneUser[0];
    const cartItems = await Cart.find(req.session.user_id);

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.priceOrg * item.quantity,
      0
    );
    const totalPriceFormatted = (
      Math.round(totalPrice * 100) / 100
    ).toLocaleString();
    const totalPriceDelivery = (
      Math.round((totalPrice + 300) * 100) / 100
    ).toLocaleString();

    return res.render("order", {
      user,
      category: req.query.category,
      userId: req.session.user_id,
      items: cartItems,
      price: totalPriceFormatted,
      priceWithDelivery: totalPriceDelivery,
      count
    });
  } catch (err) {
    next(err);
  }
};

exports.updateInfo = async (req, res, next) => {
  try {
    await User.update(
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.street_name,
      req.body.building_no,
      req.body.appartment_no,
      req.body.postal_code,
      req.body.city,
      req.body.note,
      req.session.user_id
    );
    return res.redirect(`/order/${req.session.user_id}/download`);
  } catch (err) {
    next(err);
  }
};
