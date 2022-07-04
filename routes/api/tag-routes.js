const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:tag_id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.tag_id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: "No product found with this id."});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:tag_id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          tag_id: req.params.tag_id
        }
      }
    )
    if (!updatedTag) {
      res.status(404).json({ message: 'No tag with this id.' });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:tag_id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id
    },
  })
  if (!deletedTag) {
    res.status(404).json({ message: 'No tag with this id' });
    return;
  }
  res.status(200).json(deletedTag);
  } catch (err) {res.json(err)};
});

module.exports = router;
