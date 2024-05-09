const Drink = require('./Drink');

class DrinkBuilder {
    constructor() {
            this.id = 0;
            this.name = '';
            this.alcoholic = false;
            this.ingredients = [];
            this.recipe = '';
        }
    

    setID(id_) {
        this.id = id_;
        if (id_ < 0) this.id = 0;
        return this; 
    }

    setName(name_) {
        this.name = name_;
        return this;
    }

    setAlcoholic(alcoholic_) {
        this.alcoholic = alcoholic_;
        return this;
    }

    setIngredients(ingredients_) {
        this.ingredients = ingredients_;
        return this;
    }

    setRecipe(recipe_) {
        this.recipe = recipe_;
        return this;
    }

    build() {
        const drink = new Drink(this.id, this.name, this.alcoholic, this.ingredients, this.recipe);
        return drink;
    }

}

module.exports = DrinkBuilder;
