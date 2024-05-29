import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AllRecipes from '../pages/AllRecipes';
import alphabet from '../data/Alphabet';

global.fetch = jest.fn();

describe('AllRecipes component', () => {
  beforeEach(() => {

    fetch.mockClear();
  });

  it('renders without crashing', () => {
    render(<AllRecipes />);
    expect(screen.getByText(/bottoms up/i)).toBeInTheDocument();
    expect(screen.getByText(/fill your glass first/i)).toBeInTheDocument();
  });

  it('fetches drinks for each letter of the alphabet', async () => {
    render(<AllRecipes />);

    await waitFor(() => {
      alphabet.letters.forEach((letterObject) => {
        const letter = letterObject.letter;
        expect(fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
      });
    });
  });

  it('correclty sets drinksByLetter after fetching drinks', async () => {

    const letter = 'A';
    const mockDrinks = [
      { idDrink: '1', strDrinkThumb: 'mockImage1.jpg', strDrink: 'Mock Drink 1' },
    ];
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ drinks: mockDrinks }),
    });
  });

  it('displays error alert when fetching cocktails fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    render(<AllRecipes />);

    await (() => {
      expect(console.error).toHaveBeenCalled();
    });
  });

});

