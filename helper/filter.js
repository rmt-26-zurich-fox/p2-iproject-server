const { Op } = require("sequelize");

const filter = (name, minPrice) => {
  let option;
  if (!name) {
    option = {};
  } else {
    option = { name: { [Op.iLike]: `%${name}%` } };
  }

  if (!minPrice) {
    option = { ...option };
  } else {
    option = { ...option, price: { [Op.gt]: +minPrice } };
  }

  return option;
};

module.exports = filter;
