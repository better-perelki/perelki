class Drink {
  constructor(id = 0, name = null, alcoholic = false, ingredients = null, recipe = "") {
    this.id = id;
    this.name = name;
    this.alcoholic = alcoholic;
    this.ingredients = ingredients;
    this.recipe = recipe;
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getAlcoholic() {
    return this.alcoholic;
  }

  getIngredients() {
    return this.ingredients;
  }

  getRecipe() {
    return this.recipe;
  }
}

module.exports = Drink;
  
