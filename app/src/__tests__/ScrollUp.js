// Importing necessary libraries and tools for testing.
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTop from '../components/ScrollUp';

describe('ScrollToTop Component Tests', () => {
    // Test 1:
    test('renders scroll-to-top button hidden initially', () => {
        render(<ScrollToTop />);
        const buttonElement = screen.getByTestId('scroll-to-top-button');
        expect(buttonElement).toHaveClass('hidden');
    });

    // Test 2:
    test('scroll-to-top button becomes visible when scrolling down', () => {
        render(<ScrollToTop />);

        Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });

        fireEvent.scroll(window);

        const buttonElement = screen.getByTestId('scroll-to-top-button');
        expect(buttonElement).toHaveClass('visible');
    });

    // Test 3:
    test('scroll-to-top button becomes hidden when scrolling back to the top', () => {
        render(<ScrollToTop />);
        Object.defineProperty(window, 'pageYOffset', { value: 600, writable: true });

        fireEvent.scroll(window);

        let buttonElement = screen.getByTestId('scroll-to-top-button');
        expect(buttonElement).toHaveClass('visible');

        Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true });

        fireEvent.scroll(window);

        buttonElement = screen.getByTestId('scroll-to-top-button');
        expect(buttonElement).toHaveClass('hidden');
    });

    // Test 4: 
    test('clicking on scroll-to-top button triggers scroll to top', () => {
        render(<ScrollToTop />);

        window.scrollTo = jest.fn();

        const buttonElement = screen.getByTestId('scroll-to-top-button');

        fireEvent.click(buttonElement);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
    });
});