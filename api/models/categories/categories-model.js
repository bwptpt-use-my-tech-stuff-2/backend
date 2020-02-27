const db = require('../../../data/dbConfig.js');

module.exports = {
  createCategory,
  readCategories,
  readCategoryById,
  readCategoryByName,
  updateCategory,
  deleteCategory,
};

function createCategory(category) {
  if (category) {
    return db("Categories")
      .insert(category)
      .then(u => this.readCategoryById(u[0]));
  } else {
    return null;
  };
};

function readCategories() {
  return db("Categories");
};
function readCategoryById(id) {
  if (id) {
    return db("Categories")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
function readCategoryByName(categoryName) {
  if (categoryName) {
    return db("Categories")
      .where("Category", categoryName)
      .first();
  } else {
    return null;
  };
};

function updateCategory(id, categoryUpdate) {
  if (id && categoryUpdate) {
    return db("Categories")
      .update(categoryUpdate)
      .then(count => (count > 0 ? this.readCategoryById(id) : null));
  } else {
    return null;
  };
};

function deleteCategory(id) {
  if (id) {
    return db("Categories")
      .where("id", id)
      .del();
  } else {
    return null;
  };
};