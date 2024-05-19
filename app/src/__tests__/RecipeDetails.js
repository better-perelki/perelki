// Importing necessary libraries and tools for testing.
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetails from '../pages/RecipeDetails';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('RecipeDetails Component Tests', () => {

    // Test 1:
    test('checks if recipe is fetched and displayed correctly', async () => {
        useParams.mockReturnValue({ id: '1' });
        useNavigate.mockReturnValue(jest.fn());

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [
                            {
                                idDrink: '1',
                                strDrink: 'Mojito',
                                strDrinkThumb: 'https://www.example.com/mojito.jpg',
                                strInstructions: 'instructions',
                                strIngredient1: 'ingredient 1',
                                strMeasure1: 'measure 1',
                                strIngredient2: 'ingredient 2',
                                strMeasure2: 'measure 2',
                            },
                        ],
                    }),
            })
        );

        render(<RecipeDetails />);

        await (() => {
            const recipeName = screen.getByText(/Mojito/i);
            const recipeInstructions = screen.getByText(/Instructions for Mojito/i);
            const recipeImage = screen.getByAltText(/Mojito/i);

            expect(recipeName).toBeInTheDocument();
            expect(recipeInstructions).toBeInTheDocument();
            expect(recipeImage).toBeInTheDocument();
        })
    });

    // Test 2:
    test('checks if error is logged when recipe details are not found', async () => {
        useParams.mockReturnValue({ id: '1' });
        useNavigate.mockReturnValue(jest.fn());

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [],
                    }),
            })
        );

        console.error = jest.fn();

        render(<RecipeDetails />);

        await (() => {
            const errorMessage = screen.getByText(/Recipe details not found./i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    // Test 3:
    test('checks if error is logged when fetching recipe details fails', async () => {
        useParams.mockReturnValue({ id: '1' });
        useNavigate.mockReturnValue(jest.fn());

        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

        console.error = jest.fn();

        render(<RecipeDetails />);

        await (() => {
            const errorMessage = screen.getByText(/Error fetching recipe details:/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });
});