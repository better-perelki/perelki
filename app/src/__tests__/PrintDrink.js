import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrintDrink from '../PrintDrink';

describe('PrintDrink Component Tests', () => {
    // Test 1:
    test('checks if the name is displayed correctly', () => {
        const drink = { name: 'drink' };

        render(<PrintDrink drink={drink} />);

        const nameElement = screen.getByText(/name: drink/i);
        expect(nameElement).toBeInTheDocument();
    });

    // Test 2:
    test('checks if the ingredients are displayed correctly', () => {
        const drink = { ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3'] };

        render(<PrintDrink drink={drink} />);

        const ingredientElements = screen.getAllByRole('listitem');
        expect(ingredientElements).toHaveLength(3);
        expect(ingredientElements[0]).toHaveTextContent(/ingredient 1/i);
        expect(ingredientElements[1]).toHaveTextContent(/ingredient 2/i);
        expect(ingredientElements[2]).toHaveTextContent(/ingredient 3/i);
    });

    // Test 3:
    test('checks if the recipe is displayed correctly', () => {
        const drink = { recipe: 'recipe' };

        render(<PrintDrink drink={drink} />);

        const recipeElement = screen.getByText(/recipe: recipe./i);
        expect(recipeElement).toBeInTheDocument();
    });
});