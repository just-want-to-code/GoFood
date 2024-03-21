const express = require('express');
const router = express.Router();

const { foodModel } = require('../models/Food.js');
router.put('/change', async (req, res) => {
  const { item, opt, newprice } = req.body;
  try {
    const foodData = await foodModel.findOne({ name: item });
    const newoptions = foodData.options.map((el) => {
      if (Object.keys(el).includes(opt)) {
        el[opt] = newprice;
      }
      return el;
    });

    const res2 = await foodModel.updateOne(
      { name: item },
      { options: newoptions }
    );
    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.send({ success: false });
  }
});

module.exports = router;
