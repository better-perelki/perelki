const DrinkBuilder = require('../src/DrinkBuilder.js');
const Drink = require('../src/Drink.js');

beforeEach(() => {
  drinkBuilder = new DrinkBuilder();
});
//             DLA KLASY DRINK 

// test konstruktorow

test('should create a Drink object correctly', () => {
  const drink = new Drink();
  expect(drink).toBeInstanceOf(Drink);
});

// Testy z nazwami drinkow

test('returns correct name for drink', () => {

  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setName('Mojito').build()
  expect(drink.getName()).toBe('Mojito');
});

test('returns correct name for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setName('Aperol Spritz').build()
  expect(drink.getName()).toBe('Aperol Spritz');
});

test('returns correct name for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setName('Rose').build()
  expect(drink.getName()).toBe('Rose');
});

// Testy z ID drinkow

test('returns correct ID for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setID(17890).build()
  expect(drink.getID()).toBe(17890);
});

test('returns correct ID for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setID(100).build()
  expect(drink.getID()).toBe(100);
});

test('returns correct ID for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setID(15).build()
  expect(drink.getID()).toBe(15);
});

// Test czy drink alkoholowy

test('should return correct alcoholic status for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setAlcoholic(true).build()
  expect(drink.getAlcoholic()).toBe(true);
});

test('should return correct alcoholic status for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setAlcoholic(false).build()
  expect(drink.getAlcoholic()).toBe(false);
});


// Test listy skladnikow drinka

test('should return correct ingredients list for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setIngredients(['Vodka', 'Cranberry Juice']).build()
  expect(drink.getIngredients()).toEqual(['Vodka', 'Cranberry Juice']);
});

test('should return correct ingredients list for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setIngredients(['Prosecco', 'Orange Juice', 'Apreol']).build()
  expect(drink.getIngredients()).toEqual(['Prosecco', 'Orange Juice', 'Apreol']);
});

test('should return correct ingredients list for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setIngredients(['Tequila', 'Lime Juice', 'Orange Juice', 'Coconut Milk']).build()
  expect(drink.getIngredients()).toEqual(['Tequila', 'Lime Juice', 'Orange Juice', 'Coconut Milk']);
});

// Test poprawnosci przepisow drinka

test('should return correct recipe for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setRecipe('In a mixing glass half-filled with ice cubes, combine the Scotch and vermouth. Stir well. Strain into a cocktail glass. Garnish with the lemon twist.').build();
  expect(drink.getRecipe()).toBe('In a mixing glass half-filled with ice cubes, combine the Scotch and vermouth. Stir well. Strain into a cocktail glass. Garnish with the lemon twist.');
});

test('should return correct recipe for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setRecipe('Pour all ingredients into shot glass and slam !').build();
  expect(drink.getRecipe()).toBe('Pour all ingredients into shot glass and slam !');
});

test('should return correct recipe for drink', () => {
  const drinkBuilder = new DrinkBuilder();
  const drink = drinkBuilder.setRecipe('Stir into glass over ice, garnish and serve.').build();
  expect(drink.getRecipe()).toBe('Stir into glass over ice, garnish and serve.');
});
