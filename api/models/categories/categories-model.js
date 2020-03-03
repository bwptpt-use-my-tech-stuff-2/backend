const db = require('../../../data/dbConfig.js');

module.exports = {
  createCategory,
  readCategories,
  readCategoryById,
  readCategoryByName,
  updateCategory,
  deleteCategory,
};

async function createCategory(category) {
  if (category) {
    return await db("Categories")
      .insert(category)
      .then(u => this.readCategoryById(u[0]));
  } else {
    return null;
  };
};

async function readCategories() {
  return await db("Categories");
};
async function readCategoryById(id) {
  if (id) {
    return await db("Categories")
      .where("id", id)
      .first();
  } else {
    return null;
  };
};
async function readCategoryByName(categoryName) {
  if (categoryName) {
    return await db("Categories")
      .where("Category", categoryName)
      .first();
  } else {
    return null;
  };
};

async function updateCategory(id, categoryUpdate) {
  if (id && categoryUpdate) {
    return await db("Categories")
      .where("id", id)
      .update(categoryUpdate)
      .then(count => (count > 0 ? this.readCategoryById(id) : null));
  } else {
    return null;
  };
};

async function deleteCategory(id) {
  if (id) {
    return await db("Categories")
      .where("id", id)
      .del()
      .then(count => (count > 0 ? id : null));
  } else {
    return null;
  };
};