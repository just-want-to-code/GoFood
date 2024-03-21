const express = require('express');
const router = express.Router();
const { foodModel, categoryModel } = require('../models/Food.js');
router.post('/foodData', async (req, res) => {
  try {
    const response = await foodModel.find({});
    const response2 = await categoryModel.find({});
    global.food_items = response;
    global.foodCategory = response2;
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    console.error(err.message);
    res.send('Server Error!');
  }
});

module.exports = router;
