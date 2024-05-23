import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import RandomDrink from '../components/RandomDrink';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('RandomDrink Component Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test 1:
    test('renders click message and image', () => {
        render(<RandomDrink />);

        const headingElement = screen.getByText(/click down below to get a unique recipe!/i);
        expect(headingElement).toBeInTheDocument();

        const imageElement = screen.getByAltText(/RandomDrink/i);
        expect(imageElement).toBeInTheDocument();
    });

    // Test 2:
    test('navigates to recipe page on click', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [{ idDrink: '12345' }],
                    }),
            })
        );

        render(<RandomDrink />);

        fireEvent.click(screen.getByTestId('random-drink'));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/recipe/12345'));
    });

    // Test 3:
    test('sets random drink on successful API response', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [{ idDrink: '12345' }],
                    }),
            })
        );

        render(<RandomDrink />);
        fireEvent.click(screen.getByTestId('random-drink'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/recipe/12345');
        });
    });

    // Test 4: 
    test('logs error on API response error', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        global.fetch = jest.fn(() => Promise.reject(new Error('API error')));

        console.error = jest.fn();

        render(<RandomDrink />);

        fireEvent.click(screen.getByTestId('random-drink'));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching random drink:', expect.any(Error));
        });
    });
});
