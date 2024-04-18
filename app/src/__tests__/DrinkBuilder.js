const DrinkBuilder = require('../DrinkBuilder');
const Drink = require('../Drink');

//             DLA KLASY DRINKBUILDER 

beforeEach(() => {
    drinkBuilder = new DrinkBuilder();
});

//DLA SETID

test('should setId sets ID_Drink', () => {
    const id = 123;
    const result = drinkBuilder.setId(id);
    expect(result.ID_Drink).toBe(id);
});

test('should setId sets ID_Drink', () => {
    const id = 321;
    const result = drinkBuilder.setId(id);
    expect(result.ID_Drink).toBe(id);
});

test('should setId sets ID_Drink', () => {
    const id = -123;
    const result = drinkBuilder.setId(id);
    expect(result.ID_Drink).toBe(0);
});

//DLA SETNAME

test('should setName sets Name', () => {
    const name = 'Mojito';
    const result = drinkBuilder.setName(name);
    expect(result.Name).toBe(name);
});

test('should setName sets Name', () => {
    const name = 'Bloody Mary';
    const result = drinkBuilder.setName(name);
    expect(result.Name).toBe(name);
});

test('should setName sets Name', () => {
    const name = ' ';
    const result = drinkBuilder.setName(name);
    expect(result.Name).toBe(name);
});

//DLA SETALCOHOLIC

test('should setAlcoholic sets Alcoholic', () => {
    const alcoholic = true;
    const result = drinkBuilder.setAlcoholic(alcoholic);
    expect(result.Alcoholic).toBe(alcoholic);
});

test('should setAlcoholic sets Alcoholic', () => {
    const alcoholic = false;
    const result = drinkBuilder.setAlcoholic(alcoholic);
    expect(result.Alcoholic).toBe(alcoholic);
});

//DLA SETINGREDIENTS

test('should setIngredients sets Ingredients', () => {
    const ingredients = ['Vodka', 'Gin'];
    const result = drinkBuilder.setIngredients(ingredients);
    expect(result.Ingredients).toEqual(ingredients);
});

test('should setIngredients sets Ingredients', () => {
    const ingredients = ['Tequilla', 'Orange juice'];
    const result = drinkBuilder.setIngredients(ingredients);
    expect(result.Ingredients).toEqual(ingredients);
});

test('should setIngredients sets Ingredients', () => {
    const ingredients = [];
    const result = drinkBuilder.setIngredients(ingredients);
    expect(result.Ingredients).toEqual(ingredients);
});

//DLA SETRECIPE

test('should setRecipe sets Recipe', () => {
    const recipe = 'Test recipe';
    const result = drinkBuilder.setRecipe(recipe);
    expect(result.Recipe).toBe(recipe);
});

test('should setRecipe sets Recipe', () => {
    const recipe = '';
    const result = drinkBuilder.setRecipe(recipe);
    expect(result.Recipe).toBe(recipe);
});

//DLA BUILD

test('should build returns Drink object', () => {
    const id = 123;
    const name = 'Test Drink';
    const alcoholic = true;
    const ingredients = ['Ingredient 1', 'Ingredient 2'];
    const recipe = 'Test recipe';

    drinkBuilder.setId(id);
    drinkBuilder.setName(name);
    drinkBuilder.setAlcoholic(alcoholic);
    drinkBuilder.setIngredients(ingredients);
    drinkBuilder.setRecipe(recipe);
    drink = drinkBuilder.build();

    expect(drink).toEqual({
        ID_Drink: id,
        Name: name,
        Alcoholic: alcoholic,
        Ingredients: ingredients,
        Recipe: recipe
    })
});

test('should build returns Drink object with default values', () => {
    const drink = drinkBuilder.build();

    expect(drink).toEqual({
        ID_Drink: null,
        Name: null,
        Alcoholic: null,
        Ingredients: null,
        Recipe: null
    });
});


