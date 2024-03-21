const mongoose = require('mongoose');

const { Schema } = mongoose;
const foodSchema = new Schema({}, { strict: false });
const foodModel = mongoose.model('food_items', foodSchema);

const categoryModel = mongoose.model('food_categories', foodSchema);

module.exports = { foodModel, categoryModel };
