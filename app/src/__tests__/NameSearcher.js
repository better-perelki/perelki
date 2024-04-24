import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameSearcher from '../helpers/NameSearcher';

// Mocking the fetch function
global.fetch = jest.fn();

describe('NameSearcher Component Tests', () => {
    // Test 1: Renders the component and checks if the input is present.
    test('renders input element', () => {
        render(<NameSearcher />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    // Test 2: Checks if the search results are displayed when there are drinks.
    test('displays search results when drinks are found', async () => {
        const mockData = {
            drinks: [
                { idDrink: '1', strDrink: 'Mojito' },
                { idDrink: '2', strDrink: 'Cosmopolitan' },
            ],
        };
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        render(<NameSearcher />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'mojito' } });

        await waitFor(() => {
            const resultElement = screen.getByText(/Mojito/i);
            expect(resultElement).toBeInTheDocument();
        });
    });

    // Test 3: Checks if the search results are empty when no drinks are found.
    test('displays empty search results when no drinks are found', async () => {
        const mockData = {
            drinks: [],
        };
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        render(<NameSearcher />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'mojito' } });

        await waitFor(() => {
            const resultElement = screen.getByText(/No drinks found/i);
            expect(resultElement).toBeInTheDocument();
        });
    });

    // Test 4: Checks if the search results are cleared when the input is empty.
    test('clears search results when input is empty', async () => {
        const mockData = {
            drinks: [
                { idDrink: '1', strDrink: 'Mojito' },
                { idDrink: '2', strDrink: 'Cosmopolitan' },
            ],
        };
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockData),
        });

        render(<NameSearcher />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'mojito' } });

        await waitFor(() => {
            const resultElement = screen.getByText(/Mojito/i);
            expect(resultElement).toBeInTheDocument();
        });

        fireEvent.change(inputElement, { target: { value: '' } });

        await waitFor(() => {
            const resultElement = screen.queryByText(/Mojito/i);
            expect(resultElement).not.toBeInTheDocument();
        });
    });

    // Test 5: Checks if the search term is updated when the input value changes.
    test('updates search term when input value changes', () => {
        render(<NameSearcher />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'mojito' } });
        expect(inputElement.value).toBe('mojito');
    });
});