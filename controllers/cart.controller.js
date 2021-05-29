const Cart = require("../models/cart.model");

exports.addToCart = async (req, res, next) => {
  try {
    if (!req.body.size && req.body.category != "bags") {
      req.flash("info", "Please pick a size.");
      return res.redirect(`/item/${req.params.id}`);
    }
    console.log("posle ifa");
    const cart = new Cart({
      user_id: req.session.user_id,
      item_id: req.params.id,
      item_name: req.body.item_name,
      price: req.body.price,
      size: req.body.size,
      img_url: req.body.img_url,
      quantity: req.body.quantity,
    });

    await Cart.create(cart);

    return res.redirect(`/item/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

exports.cart = async (req, res, next) => {
  try {
    const countArr = await Cart.count(req.session.user_id);
    const count = countArr.map((count) => count.count);
    const cartItems = await Cart.find(req.session.user_id);
    const userId = req.session.user_id;
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.priceOrg * item.quantity,
      0
    );
    const totalPriceFormatted = (
      Math.round(totalPrice * 100) / 100
    ).toLocaleString();
    console.log(cartItems[0]);

    return res.render("cart", {
      items: cartItems,
      userId,
      price: totalPriceFormatted,
      count
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  try {
    await Cart.delete(req.body.id);

    return res.redirect(`/cart/${req.session.user_id}`);
  } catch (err) {
    next(err);
  }
};
