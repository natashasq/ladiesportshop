const Items = require("../models/items.model");
const Cart = require("../models/cart.model");

exports.item = async (req, res, next) => {
  try {
    const allItems = await Items.findOne(req.params.id);
    const oneItem = allItems[0];
    const sizes = await Items.getSizes(req.params.id);
    const images = await Items.getImages(req.params.id);

    const countArr = await Cart.count(req.session.user_id);
    const count = countArr.map((count) => count.count);

    const userId = req.session.user_id;

    return res.render("item", {
      allItems,
      item: oneItem,
      sizes,
      images,
      userId,
      count
    });
  } catch (err) {
    next(err);
  }
};
