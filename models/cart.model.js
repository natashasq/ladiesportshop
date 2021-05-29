const connection = require("../config/db");

class Cart {
  constructor(cart) {
    this.user_id = cart.user_id;
    this.item_id = cart.item_id;
    this.item_name = cart.item_name;
    this.price = cart.price;
    this.size = cart.size;
    this.img_url = cart.img_url;
    this.quantity = cart.quantity;
  }
}

Cart.create = (newCart) => {
  return new Promise(async (res, rej) => {
    try {
      const [cart, _] = await connection.query("INSERT INTO cart SET ?", [
        newCart,
      ]);
      res(cart);
    } catch (err) {
      rej(err);
    }
  });
};

Cart.find = (user_id) => {
  return new Promise(async (res, rej) => {
    try {
      const [cart, _] = await connection.query(
        "SELECT id, user_id, item_id, item_name, format(price, 0) as price, price as priceOrg, size, img_url, quantity FROM cart WHERE user_id = ?",
        [user_id]
      );
      res(cart);
    } catch (err) {
      rej(err);
    }
  });
};

Cart.delete = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const [deleted, _] = await connection.query(
        "DELETE from cart WHERE id = ?",
        [id]
      );
      res(deleted);
    } catch (err) {
      rej(err);
    }
  });
};

Cart.count = (user_id) => {
  return new Promise(async (res, rej) => {
    try {
      const [count, _] = await connection.query(
        "SELECT COUNT(id) as 'count' from cart WHERE user_id = ?",
        [user_id]
      );
      res(count);
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = Cart;
