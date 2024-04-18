import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrinkDetails from '../DrinkDetails';

// json parsing
describe('DrinkDetails Component Tests', () => {
    // Test 1: 
    test('checks if drinks are fetched and stored in state', async () => {
        // mocking global fetch function to resolve with mock data
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [
                            { idDrink: '1', strDrink: 'Margarita', strCategory: 'Cocktail' },
                            { idDrink: '2', strDrink: 'Martini', strCategory: 'Cocktail' },
                        ],
                    }),
            })
        );

        render(<DrinkDetails />);

        const drinks = await screen.findByText(/Margarita/i);
        expect(drinks).toBeInTheDocument();
    });

    // Test 2: 
    test('checks if error is handled when fetching drinks', async () => {
        // mocking global fetch function to reject with an error.
        global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch drinks')));

        // mocking console.error to prevent error message from being logged.
        console.error = jest.fn();

        render(<DrinkDetails />);

        // expect the error message to be logged to the console.
        expect(console.error).toHaveBeenCalledWith(
            'Error fetching drinks:',
            new Error('Failed to fetch drinks')
        );
    });
});