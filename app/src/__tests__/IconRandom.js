import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import IconRandom from '../components/IconRandom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('IconRandom Component Tests', () => {
    let mockNavigate;

    beforeEach(() => {
        mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    // Test 1:
    test('renders random drink icon', () => {
        render(<IconRandom />);

        const iconElement = screen.getByAltText(/IconRandom/i);
        expect(iconElement).toBeInTheDocument();
    });

    // Test 2:
    test('renders close button', () => {
        render(<IconRandom />);
        const closeButton = screen.getByAltText(/Remove/i);
        expect(closeButton).toBeInTheDocument();
    });

    // Test 3:
    test('clicking random drink icon triggers navigation', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [{ idDrink: '123' }],
                    }),
            })
        );

        render(<IconRandom />);

        const iconElement = screen.getByAltText(/IconRandom/i);
        fireEvent.click(iconElement);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/recipe/123');
        });
    });

    // Test 4:
    test('clicking close button hides the icon', () => {
        render(<IconRandom />);

        const closeButton = screen.getByAltText(/Remove/i);
        fireEvent.click(closeButton);

        const iconElement = screen.queryByAltText(/IconRandom/i);
        expect(iconElement).toBeNull();
    });

    // Test 5:
    test('fetching random drink triggers navigation', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        drinks: [{ idDrink: '123' }],
                    }),
            })
        );

        render(<IconRandom />);

        const iconElement = screen.getByAltText(/IconRandom/i);
        fireEvent.click(iconElement);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/recipe/123');
        });
    });

    // Test 6:
    test('handles error during fetching', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));
        console.error = jest.fn();

        render(<IconRandom />);

        const iconElement = screen.getByAltText(/IconRandom/i);
        fireEvent.click(iconElement);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error fetching random drink:', new Error('Fetch error'));
        });

        global.fetch.mockReset();
        console.error.mockReset();
    });
});