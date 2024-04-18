const Drink = require('../Drink');
const RecipeBook = require('../RecipeBook');

//DLA KLASY RECIPEBOOK

beforeEach(() => {
    recipeBook = new RecipeBook();
});

test('should AddDrink adds a drink to the recipe book', () => {
    const drink = new Drink();
    recipeBook.addDrink(drink);
    expect(recipeBook.drinks[0]).toContain(drink);
});

test('should AddDrink adds a drink to the recipe book', () => {
    const drink1 = new Drink();
    const drink2 = new Drink();

    recipeBook.addDrink(drink1);
    recipeBook.addDrink(drink2);

    expect(recipeBook.drinks[0]).toContain(drink1);
    expect(recipeBook.drinks[1]).toContain(drink2);
});

test('should RemoveDrink removes a drink from the recipe book', () => {
    const drink1 = new Drink();
    const drink2 = new Drink();

    recipeBook.addDrink(drink1);
    recipeBook.addDrink(drink2);
    expect(recipeBook.drinks[0]).toContain(drink1);
    expect(recipeBook.drinks[1]).toContain(drink2);

    recipeBook.removeDrink(drink1);
    expect(recipeBook.drinks[0]).not.toContain(drink1);
    expect(recipeBook.drinks[1]).toContain(drink2);
});

test('should RemoveDrink does not remove non-existent drink from the recipe book', () => {
    const drink1 = new Drink();
    const drink2 = new Drink();

    recipeBook.addDrink(drink1);
    expect(recipeBook.drinks[0]).toContain(drink1);
    expect(recipeBook.drinks[1]).not.toContain(drink2);

    recipeBook.removeDrink(drink2);
    expect(recipeBook.drinks[0]).toContain(drink1);
    expect(recipeBook.drinks[1]).not.toContain(drink2);
});


