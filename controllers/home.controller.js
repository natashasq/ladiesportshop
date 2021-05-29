const Items = require("../models/items.model");
const Cart = require("../models/cart.model");

exports.getAll = async (req, res, next) => {
  try {
    // const pagePath = req.path.split("/")[1];
    // console.log(pagePath);
    // const findPath = (path) => {
    //   let headerPath;
    //   if (path === "item") {
    //     headerPath = "Details";
    //   }

    //   if (path === "cart") {
    //     headerPath = "Cart";
    //   }

    //   if (path === "order") {
    //     headerPath = "Order";
    //   }
    //   return headerPath;
    // };
   
    const allItems = await Items.getAll(
      req.query.category,
      req.query.name,
      req.query.direction
    );
    const countArr = await Cart.count(req.session.user_id);
    const count = countArr.map((count) => count.count);
    const userId = req.session.user_id;
    const sortRes = (query) => {
      let sort = "Sort By";

      if (query.name === "item_name" && query.direction === "DESC") {
        sort = "Name ⬇";
      }

      if (query.name === "item_name" && query.direction !== "DESC") {
        sort = "Name ⬆";
      }

      if (query.name === "price" && query.direction === "DESC") {
        sort = "Price ⬇";
      }

      if (query.name === "price" && query.direction !== "DESC") {
        sort = "Price ⬆";
      }

      return sort;
    };

    return res.render("home", {
      allItems,
      userId,
      count,
      sort: sortRes(req.query)
    });
  } catch (err) {
    next(err);
  }
};
