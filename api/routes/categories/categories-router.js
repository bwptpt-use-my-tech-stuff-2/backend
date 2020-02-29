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
        res.status(500).json({ message: `Failed to create new category`, error: err });
      });
  };
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
          res.status(200).json(category);
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
          res.status(200).json(category);
        } else {
          res.status(404).json({ message: `Could not get category with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get category`, error: err });
      });
  };
});
router.get('/', authenticate, (req, res) => {
  Categories.readCategories()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get categories`, error: err });
    });
});

router.put('/:categoryId', authenticate, (req, res) => {
  const { categoryId } = req.params;
  const id = parseInt(categoryId, 10);
  const categoryData = req.body;

  if (!process.env.NO_LOGGER) console.log(`TCL: updateCategory(${id})`);
  if (!process.env.NO_LOGGER) console.log(`TCL: categoryData:\n`, categoryData);

  if (!categoryData.Category) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (id > 0) {
      Categories.updateCategory(id, categoryData)
        .then(updatedCategory => {
          console.log(`TCL: updatedCategory`, updatedCategory);
          if (updatedCategory) {
            res.status(200).json({ updatedCategory: id });
          } else {
            res.status(404).json({ message: `Could not get category with given id` });
          };
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update category`, error: err });
        });
    };
  };
});

router.delete('/:categoryId', authenticate, (req, res) => {
  const { categoryId } = req.params;
  const id = parseInt(categoryId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteCategory(${id})`);
  if (id > 0) {
    Categories.deleteCategory(id)
      .then(removedCategory => {
        if (removedCategory) {
          res.status(200).json({ removedCategory: id });
        } else {
          res.status(404).json({ message: `Could not get category with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete category`, error: err });
      });
  };
});

module.exports = router;