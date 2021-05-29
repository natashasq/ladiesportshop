const connection = require("../config/db");

//SNEAKERS
class Item {
  constructor(item) {
    this.item_name = item.item_name;
    this.item_price = item.item_price;
    this.item_img_url = item.item_img_url;
    this.sort = item.sort;
  }
}

Item.getAll = (category, name = "item_name", direction = "") => {
  return new Promise(async (res, rej) => {
    try {
      const commonQueryString =
        "SELECT id, item_name, format(item_price, 0) as item_price, item_price as price, item_img_url FROM items";
      const filterQueryString = `${commonQueryString} WHERE category = ?`;
      const sortQueryString = `ORDER BY ${name} ${direction}`;

      const [allItems, _] = category
        ? await connection.query(`${filterQueryString} ${sortQueryString}`, [
            category,
          ])
        : await connection.query(`${commonQueryString} ${sortQueryString}`);

      res(allItems);
    } catch (err) {
      rej(err);
    }
  });
};

Item.findOne = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const [item, _] = await connection.query(
        "SELECT id, item_name, format(item_price, 0) as item_price, item_img_url, category FROM items WHERE id = ?",
        [id]
      );
      res(item);
    } catch (err) {
      rej(err);
    }
  });
};

Item.getSizes = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const [sizes, _] = await connection.query(
        "SELECT items.id, items.category, sizes.item_size from items join sizes on items.id = sizes.id WHERE sizes.item_size is not null and items.id = ?",
        [id]
      );
      res(sizes);
    } catch (err) {
      rej(err);
    }
  });
};

Item.getImages = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const [images, _] = await connection.query(
        "SELECT items.id as item_id, images.img_url, images.id from items join images on items.id = images.item_id where items.id = ?",
        [id]
      );
      res(images);
    } catch (err) {
      rej(err);
    }
  });
};

Item.orderByName = () => {
  return new Promise(async (res, rej) => {
    try {
      const [item, _] = await connection.query(
        "SELECT id, item_name, format(item_price, 0) as item_price, item_img_url FROM items ORDER by item_name"
      );
      res(item);
    } catch (err) {
      rej(err);
    }
  });
};

Item.orderByNameDESC = () => {
  return new Promise(async (res, rej) => {
    try {
      const [item, _] = await connection.query(
        "SELECT id, item_name, format(item_price, 0) as item_price, item_img_url FROM items ORDER by item_name DESC"
      );
      res(item);
    } catch (err) {
      rej(err);
    }
  });
};

Item.orderByPrice = () => {
  return new Promise(async (res, rej) => {
    try {
      const [item, _] = await connection.query(
        "SELECT id, item_name, format(item_price, 0) as item_price, item_price as org_price, item_img_url FROM items ORDER by org_price"
      );
      res(item);
    } catch (err) {
      rej(err);
    }
  });
};

Item.orderByPriceDesc = () => {
  return new Promise(async (res, rej) => {
    try {
      const [item, _] = await connection.query(
        "SELECT id, item_name, format(item_price, 0) as item_price, item_price as org_price, item_img_url FROM items ORDER by org_price DESC"
      );
      res(item);
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = Item;
