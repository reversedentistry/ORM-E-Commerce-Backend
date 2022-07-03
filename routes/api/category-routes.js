const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    }); 
    res.status(200).json(allCategories); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    }); 
    if (!category) {
      res.status(404).json({ message: 'No category found with this id.' });
      return;
    }
    res.status(200).json(category); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body); 
    res.status(200).json(newCategory); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    }, 
    {
      where: {
        category_id: req.params.category_id
      }
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err); 
    res.json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id
    },
  })
  .then((deletedCategory) => {
    res.json(deletedCategory)
  })
  .catch((err) => res.json(err));
});

module.exports = router;
