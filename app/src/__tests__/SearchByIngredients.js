const DrinkBuilder = require('../DrinkBuilder.js');
const Drink = require('../Drink.js');

const Builder = new DrinkBuilder();
const mockDrinks = [
  Builder.setName('Brainteaster').setIngredients(['Sambuca', 'Advocaat', 'Erin Cream']).build(),
  Builder.setName('Snowball').setIngredients(['Lemonade', 'Advocaat', 'Lemon']).build(),
  Builder.setName('Kiss me Quick').setIngredients(['Cranberry Vodka', 'Apfelkorn', 'Apple Juice', 'Schweppes Russchian']).build(),
  Builder.setName('Angel Face').setIngredients(['Apricot brandy', 'Apple brandy', 'Gin']).build(),
  Builder.setName('Jack Rose Cocktail').setIngredients(['Grenadine', 'Apple brandy', 'Lime']).build(),
  Builder.setName('White Wine Sangria').setIngredients(['White Wine', 'Apple brandy', 'Soda Water', 'Fruits']).build(),
  Builder.setName('Zimadori Zinger').setIngredients(['Zima', 'Midori melon liqueur']).build(),
  Builder.setName('Zima Blaster').setIngredients(['Chambord raspberry liqueur', 'Zima']).build(),
  Builder.setName('Mojito').setIngredients(['Rum', 'Lime', 'Mint', 'Sugar']).build(),
  Builder.setName('Aperol Spritz').setIngredients(['Aperol', 'Prosecco', 'Soda Water', 'Orange Slice']).build(),
  Builder.setName('Old Cuban').setIngredients(['Rum', 'Mint', 'Lime', 'Simple Syrup', 'Angostura Bitters', 'Champagne']).build(),
];

test('should return list of drinks containing selected ingredients', () => {
  const SearchByIngredients = new SearchByIngredients();
  const ingredientsToSearch = ['Advocaat', 'Sambuca', 'Erin Cream'];

  // Lista oczekiwanych nazw drinków mających podane składniki
  const expectedDrinkNames = ['Brainteaster', 'Snowball'];

  const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);

  // Pobieramy nazwy drinków z wyników wyszukiwania
  const resultDrinkNames = result.map(drink => drink.name);

  // Sprawdzamy, czy wszystkie oczekiwane nazwy drinków są obecne w wynikach
  expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
});

test('should return list of drinks containing selected ingredients', () => {
  const SearchByIngredients = new SearchByIngredients();
  const ingredientsToSearch = ['Apfelkorn', 'Apple Brandy', 'Cranberry Vodka', 'Apricot brandy', 'Gin'];

  // Lista oczekiwanych nazw drinków mających podane składniki
  const expectedDrinkNames = ['Kiss me Quick', 'Angel Face', 'Jack Rose Cocktail', 'White Wine Sangria'];

  const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);

  // Pobieramy nazwy drinków z wyników wyszukiwania
  const resultDrinkNames = result.map(drink => drink.name);

  // Sprawdzamy, czy wszystkie oczekiwane nazwy drinków są obecne w wynikach
  expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
});

test('should return list of drinks containing selected ingredients', () => {
  const SearchByIngredients = new SearchByIngredients();
  const ingredientsToSearch = ['Zima', 'Chambord raspberry liqueur', 'Midori melon liqueur'];

  // Lista oczekiwanych nazw drinków mających podane składniki
  const expectedDrinkNames = ['Zimadori Zinger', 'Zima Blaster'];

  const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);

  // Pobieramy nazwy drinków z wyników wyszukiwania
  const resultDrinkNames = result.map(drink => drink.name);

  // Sprawdzamy, czy wszystkie oczekiwane nazwy drinków są obecne w wynikach
  expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
});
