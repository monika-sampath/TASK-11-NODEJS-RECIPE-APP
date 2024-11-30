const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  prepTime: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
