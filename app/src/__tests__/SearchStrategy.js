const DrinkBuilder = require('../src/DrinkBuilder.js');
const Drink = require('../src/Drink.js');

test('should return list of drinks which contain selected ingredients ', () => {
    const SearchByIngredients = new SearchByIngredients();
    const ingredientsToSearch = ['Advocaat', 'Sambuca', 'Erin Cream'];
  
    const expectedDrinkNames = ['Brainteaster', 'Snowball'];
  
    const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
  test('should return list of drinks which contain selected ingredients ', () => {
    const SearchByIngredients = new SearchByIngredients();
    const ingredientsToSearch = ['Apfelkorn', 'Apple Brandy', 'Cranberry Vodka', 'Apricot brandy', 'Gin'];
  
    const expectedDrinkNames = ['Kiss me Quick', 'Angel Face', 'Jack Rose Cocktail', 'White Wine Sangria'];
  
    const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
  test('should return list of drinks which contain selected ingredients ', () => {
    const SearchByIngredients = new SearchByIngredients();
    const ingredientsToSearch = ['Zima', 'Chambord raspberry liqueur', 'Midori melon liqueur'];
  
    const expectedDrinkNames = ['Zimadori Zinger', 'Zima Blaster'];
  
    const result = SearchByIngredients.search(ingredientsToSearch, mockDrinks);
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
  
  //searchbyname
  
  test('should return search results by name', () => {
    const searchStrategy = new SearchByNameStrategy();
  
    const result = searchStrategy.search('Mojito', {
      searchByName: (name) => mockDrinks.filter(drink => drink.name.includes(name))
    });
  
    const expectedDrinkNames = ['Mojito'];
  
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
  test('should return search results by name', () => {
    const searchStrategy = new SearchByNameStrategy();
  
    const result = searchStrategy.search('Aperol Spritz', {
      searchByName: (name) => mockDrinks.filter(drink => drink.name.includes(name))
    });
  
    const expectedDrinkNames = ['Aperol Spritz'];
  
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
  test('should return search results by name', () => {
    const searchStrategy = new SearchByNameStrategy();
  
    const result = searchStrategy.search('Old Cuban', {
      searchByName: (name) => mockDrinks.filter(drink => drink.name.includes(name))
    });
  
    const expectedDrinkNames = ['Old Cuban'];
  
    const resultDrinkNames = result.map(drink => drink.name);
  
    expect(resultDrinkNames).toEqual(expect.arrayContaining(expectedDrinkNames));
  });
  
