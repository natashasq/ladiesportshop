const connection = require("../config/db");

class User {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.street_name = user.street_name;
    this.building_no = user.building_no;
    this.appartment_no = user.appartment_no;
    this.postal_code = user.postal_code;
    this.city = user.city;
    this.note = user.note;
  }
}

User.create = (newUser) => {
  return new Promise(async (res, rej) => {
    try {
      const [user, _] = await connection.query("INSERT INTO users SET ?", [
        newUser,
      ]);
      res(user);
    } catch (err) {
      rej(err);
    }
  });
};

User.getAll = () => {
  return new Promise(async (res, rej) => {
    try {
      const [allUsers, _] = await connection.execute("SELECT * FROM users");
      res(allUsers);
    } catch (err) {
      rej(err);
    }
  });
};

User.findById = (user_id) => {
  return new Promise(async (res, rej) => {
    try {
      const [user, _] = await connection.execute(
        "SELECT * FROM users WHERE user_id = ?",
        [user_id]
      );
      res(user);
    } catch (err) {
      rej(err);
    }
  });
};

User.findOne = (email) => {
  return new Promise(async (res, rej) => {
    try {
      const [user, _] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      res(user);
    } catch (err) {
      rej(err);
    }
  });
};

User.update = (
  first_name, 
  last_name,
  phone,
  street_name,
  building_no,
  appartment_no,
  postal_code,
  city,
  note,
  user_id
) => {
  return new Promise(async (res, rej) => {
    try {
      const [user, _] = await connection.execute(
        "UPDATE users SET first_name = ?, last_name = ?, phone = ?, street_name = ?, building_no = ?, appartment_no = ?, postal_code = ?, city = ?, note = ? WHERE user_id = ?",
        [
          first_name, 
          last_name,
          phone,
          street_name,
          building_no,
          appartment_no,
          postal_code,
          city,
          note,
          user_id,
        ]
      );
      res(user);
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = User;
