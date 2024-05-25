import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchByIngredients from '../pages/SearchByIngredients';

describe('SearchByIngredients Component Tests', () => {
  // Test 1:
  test('renders the component and checks if "Choose ingredients" text is present', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            drinks: [
              { strIngredient1: 'Ingredient 1' },
              { strIngredient1: 'Ingredient 2' },
            ],
          }),
      })
    );

    render(<SearchByIngredients />);

    const chooseIngredientsText = await screen.findByText(/Choose ingredients:/i);
    expect(chooseIngredientsText).toBeInTheDocument();
  });


  // Test 2:
  test('adds ingredient to selectedIngredients array when a new ingredient is selected', async () => {
    const { getByRole, getByText } = render(<SearchByIngredients />);
    const select = getByRole('combobox');

    fireEvent.change(select, { target: { value: 'New Ingredient' } });

    await (() => {
      const ingredient = screen.findByText(/New Ingredient/i);
      expect(ingredient).toBeInTheDocument();
    })
  });

  // Test 3:
  test('removes ingredient from selectedIngredients array when delete button is clicked', async () => {
    const { getByRole, getByText } = render(<SearchByIngredients />);

    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Ingredient 1' } });

    await (() => {
      const ingredient = screen.findByText(/Ingredient 1/i);
      fireEvent.click(getByText('Delete'));
      expect(ingredient).not.toBeInTheDocument();
    })
  });

  // Test 4:
  test('displays error alert when fetching cocktails fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    render(<SearchByIngredients />);

    await (() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});