import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
}));

describe('Navbar Component Tests', () => {
    let useLocationMock;

    beforeEach(() => {
        useLocationMock = require('react-router-dom').useLocation;
        useLocationMock.mockReturnValue({ pathname: '/' });
    });

    // Test 1:
    test('renders home link', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const homeLinkElement = screen.getByAltText(/Home/i);
        expect(homeLinkElement).toBeInTheDocument();
    });

    // Test 2:
    test('renders menu icon', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const menuIconElement = screen.getByAltText(/Menu/i);
        expect(menuIconElement).toBeInTheDocument();
    });

    // Test 3:
    test('toggles menu on click', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        );

        const menuIconElement = screen.getByAltText(/Menu/i);
        const menuLinksElement = screen.getByTestId('menu-links');

        expect(menuLinksElement).not.toHaveClass('active');

        fireEvent.click(menuIconElement);

        expect(menuLinksElement).toHaveClass('active');

        fireEvent.click(menuIconElement);

        expect(menuLinksElement).not.toHaveClass('active');
    });

    // Test 4: 
    test('highlights active link', () => {
        const { rerender } = render(
            <Router>
                <Navbar />
            </Router>
        );

        const searchByNameLinkElement = screen.getByText(/Search by name/i);
        const searchByIngredientsLinkElement = screen.getByText(/Search by ingredients/i);
        const allRecipesLinkElement = screen.getByText(/All Recipes/i);

        expect(searchByNameLinkElement).not.toHaveClass('active');
        expect(searchByIngredientsLinkElement).not.toHaveClass('active');
        expect(allRecipesLinkElement).not.toHaveClass('active');

        useLocationMock.mockReturnValue({ pathname: '/search-by-name' });
        rerender(
            <Router>
                <Navbar />
            </Router>
        );

        expect(searchByNameLinkElement).toHaveClass('active');
        expect(searchByIngredientsLinkElement).not.toHaveClass('active');
        expect(allRecipesLinkElement).not.toHaveClass('active');

        useLocationMock.mockReturnValue({ pathname: '/search-by-ingredients' });
        rerender(
            <Router>
                <Navbar />
            </Router>
        );

        expect(searchByNameLinkElement).not.toHaveClass('active');
        expect(searchByIngredientsLinkElement).toHaveClass('active');
        expect(allRecipesLinkElement).not.toHaveClass('active');

        useLocationMock.mockReturnValue({ pathname: '/all-recipes' });
        rerender(
            <Router>
                <Navbar />
            </Router>
        );

        expect(searchByNameLinkElement).not.toHaveClass('active');
        expect(searchByIngredientsLinkElement).not.toHaveClass('active');
        expect(allRecipesLinkElement).toHaveClass('active');
    });
});
