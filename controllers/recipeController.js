const Recipe = require("../models/recipe");

// Create a new recipe
exports.createRecipe = async (req, res) => {
  const { name, ingredients, instructions, prepTime, servings } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      prepTime,
      servings,
    });
    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe created successfully!", recipe: newRecipe });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating recipe", error: error.message });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: error.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipe", error: error.message });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, prepTime, servings } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, instructions, prepTime, servings },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res
      .status(200)
      .json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating recipe", error: error.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
};
