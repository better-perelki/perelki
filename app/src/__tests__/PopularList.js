import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopularList from '../helpers/PopularList';

describe('PopularList Component Tests', () => {
    // Test 1:
    test('renders the component and checks if the drinks list is present', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [
                            {
                                idDrink: '1',
                                strDrinkThumb: 'mockImage1',
                                strDrink: 'Mock Drink 1',
                                strIngredient1: 'ingr1',
                                strIngredient2: 'ingr2',
                                strIngredient3: 'ingr3'
                            },
                            {
                                idDrink: '2',
                                strDrinkThumb: 'mockImage2',
                                strDrink: 'Mock Drink 2',
                                strIngredient1: 'ingr1',
                                strIngredient2: 'ingr2',
                                strIngredient3: 'ingr3'
                            },
                        ],
                    }),
            })
        );

        render(<PopularList />);

        const drinkElement = await screen.findByText(/Mock Drink 1/i);
        expect(drinkElement).toBeInTheDocument();
    });

    // Test 2:
    test('checks if the error message is displayed when fetching drinks fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

        render(<PopularList />);

        await (() => {
            expect(console.error).toHaveBeenCalled();
        });

        expect(screen.queryByText(/error fetching drinks:/i)).not.toBeInTheDocument();
    });
});