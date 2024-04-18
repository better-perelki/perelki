import React from 'react';

class Drink extends React.Component  {
  constructor() {
    this._id = 0;
    this._name = '';
    this._alcoholic = false;
    this._ingredients = [];
    this._recipe = '';
  }

  getId() {
    return this._id;
  }

  getName() {
    return this._name;
  }

  getAlcoholic() {
    return this._alcoholic;
  }

  getIngredients() {
    return this._ingredients;
  }

  getRecipe() {
    return this._recipe;
  }
}

export default Drink;
