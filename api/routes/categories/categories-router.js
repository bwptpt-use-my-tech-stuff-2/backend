const router = require('express').Router();
const Categories = require('../../models/categories/categories-model.js');
const authenticate = require('../../middleware/auth.js');

router.post('/', authenticate, (req, res) => {
  const categoryData = req.body;

  if (!categoryData.Category) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Categories.createCategory(categoryData)
      .then(addedCategory => {
        res.status(201).json(addedCategory);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new category` });
      });
  };
});

router.get('/', authenticate, (req, res) => {
  Categories.readCategories()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get categories` });
    });
});
router.get('/:categoryRef', authenticate, (req, res) => {
  const { categoryRef } = req.params;
  console.log(`TCL: get(/:categoryRef) =`, categoryRef);
  categoryId = parseInt(categoryRef, 10);
  if (categoryId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readCategoryById(${categoryId})`);
    Categories.readCategoryById(categoryId)
      .then(category => {
        if (category) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, category);
          res.status(200).json({ categoryData: category });
        } else {
          res.status(404).json({ message: `Could not get category with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get category` });
      });
  } else {
    categoryName = categoryRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readCategoryByName(${categoryName})`);
    Categories.readCategoryByName(categoryName)
      .then(category => {
        if (category) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, category);
          res.status(200).json({ categoryData: category });
        } else {
          res.status(404).json({ message: `Could not get category with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get category` });
      });
  };
});

router.put('/:categoryId', authenticate, (req, res) => {
  const { categoryId } = req.params;
  const uId = parseInt(categoryId, 10);
  const categoryData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateCategory(${uId})`);

  if (!uID > 0 || !categoryData.Category) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Categories.updateCategory(uId, categoryData)
      .then(updatedCategory => {
        if (updatedCategory) {
          res.status(200).json({ updatedCategory: uId });
        } else {
          res.status(404).json({ message: `Could not get category with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to update category` });
      });
  };
});

router.delete('/:categoryId', authenticate, (req, res) => {
  const { categoryId } = req.params;
  const uId = parseInt(categoryId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteCategory(${uId})`);
  if (uId > 0) {
    Categories.deleteCategory(uId)
      .then(removedCategory => {
        if (removedCategory) {
          res.status(200).json({ removedCategory: uId });
        } else {
          res.status(404).json({ message: `Could not get category with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete category` });
      });
  };
});

module.exports = router;