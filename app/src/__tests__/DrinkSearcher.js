import '@testing-library/jest-dom';
import DrinkSearcher from '../DrinkSearcher';
import assert from 'assert';
describe('Strategy Setter Tests', () => {

    // Test 1:
    test('verifies that the setStrategy method correctly sets the strategy property of the DrinkSearcher class', () => {
        const searcher = new DrinkSearcher();

        // create a mock strategy object
        const strategy = {
            search: (query) => {
                return `Searching for ${query} using the strategy`;
            }
        };

        searcher.setStrategy(strategy);

        // verify that the strategy property is set correctly
        assert.strictEqual(searcher.strategy, strategy);
    });

    // Test 2:
    test('checks if the search method executes correctly', () => {
        const searcher = new DrinkSearcher();

        // create a mock strategy object
        const strategy = {
            search: (query) => {
                return `Searching for ${query} using the strategy`;
            }
        };

        searcher.setStrategy(strategy);

        const result = searcher.executeSearch('drink');

        // verify that the search method is executed correctly
        assert.strictEqual(result, 'Searching for drink using the strategy');
    })

    // Test 3:
    test('checks if an error is thrown when strategy not set', () => {
        const searcher = new DrinkSearcher();

        // execute the search method without setting the strategy
        assert.throws(() => searcher.executeSearch('coffee'), Error, 'Strategy is not set');
    })
});