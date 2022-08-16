const { Op } = require("sequelize");

const filter = (name, category) => {
  let option;
  if (!name) {
    option = {};
  } else {
    option = { name: { [Op.iLike]: `%${name}%` } };
  }

  if (!category) {
    option = { ...option };
  } else {
    option = { ...option, category };
  }

  return option;
};

module.exports = filter;
