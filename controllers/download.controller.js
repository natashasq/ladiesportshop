const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.order = async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.user_id);
    const user = oneUser[0];
    const cartItems = await Cart.find(req.params.user_id);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceOrg, 0);
    let totalPriceDelivery = totalPrice + 300;
    const totalPriceFormatted = (
      Math.round(totalPrice * 100) / 100
    ).toLocaleString();
    const totalPriceDelFormatted = (
      Math.round(totalPriceDelivery * 100) / 100
    ).toLocaleString();

    let currentdate = new Date();
    let dateTime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();

    return res.render("download", {
      user,
      category: req.query.category,
      userId: req.session.user_id,
      items: cartItems,
      price: totalPriceFormatted,
      totalPrice: totalPriceDelFormatted,
      dateTime
    });
  } catch (err) {
    next(err);
  }
};
