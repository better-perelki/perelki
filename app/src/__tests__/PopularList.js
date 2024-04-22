import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopularList from './PopularList';

jest.mock('./GetIngredients', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('PopularList Component Tests', () => {
    // Test 1:
    test('renders the component and checks if the drinks list is present', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [
                            {
                                idDrink: '1',
                                strDrinkThumb: 'mockImage1',
                                strDrink: 'Mock Drink 1',
                            },
                            {
                                idDrink: '2',
                                strDrinkThumb: 'mockImage2',
                                strDrink: 'Mock Drink 2',
                            },
                        ],
                    }),
            })
        );


        render(<PopularList />);

        const drinkElement = screen.getByText(/Mock Drink 1/i);
        expect(drinkElement).toBeInTheDocument();
    });

    // Test 2:
    test('checks if the error message is displayed when fetching drinks fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

        render(<PopularList />);

        const errorMessage = await screen.findByText(/error fetching drinks:/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // Test 3:
    test('checks if the GetIngredients function is called with the correct drink data', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [
                            {
                                idDrink: '1',
                                strDrinkThumb: 'mockImage1',
                                strDrink: 'Mock Drink 1',
                            },
                        ],
                    }),
            })
        );

        const mockIngredients = ['Ingredient 1', 'Ingredient 2'];
        jest.mock('./GetIngredients', () => ({
            __esModule: true,
            default: jest.fn(() => mockIngredients),
        }));

        render(<PopularList />);

        expect(require('./GetIngredients').default).toHaveBeenCalledWith({
            idDrink: '1',
            strDrinkThumb: 'mockImage1',
            strDrink: 'Mock Drink 1',
        });
    });
});