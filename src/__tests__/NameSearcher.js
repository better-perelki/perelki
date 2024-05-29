import { renderHook, act } from '@testing-library/react-hooks';
import NameSearcher from '../helpers/NameSearcher';

describe('NameSearcher function', () => {
    test('checks if initial state is returned', () => {
        const { result } = renderHook(() => NameSearcher());
        expect(result.current.searchTerm).toEqual('');
        expect(result.current.searchResults).toEqual([]);
    });

    test('checks if searchTerm is updated when handleInputChange is called', () => {
        const { result } = renderHook(() => NameSearcher());
        const event = { target: { value: 'Cocktail' } };
        act(() => {
            result.current.handleInputChange(event);
        });
        expect(result.current.searchTerm).toEqual('Cocktail');
    });

    test('checks if searchResults are updated based on searchTerm', async () => {
        const { result, waitForNextUpdate } = renderHook(() => NameSearcher());

        const mockData = {
            drinks: [
                { strDrink: 'Mocktail 1' },
                { strDrink: 'Mocktail 2' },
                { strDrink: 'Cocktail 1' },
                { strDrink: 'Cocktail 2' }
            ]
        };

        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockData),
        });

        act(() => {
            result.current.handleInputChange({ target: { value: 'Cocktail' } });
        });

        await waitForNextUpdate();

        expect(result.current.searchResults).toEqual([
            { strDrink: 'Cocktail 1' },
            { strDrink: 'Cocktail 2' }
        ]);
    });

    test('checks if searchResults are cleared when searchTerm is empty', async () => {
        const { result } = renderHook(() => NameSearcher());

        const mockData = {
            drinks: [
                { strDrink: 'Mocktail 1' },
                { strDrink: 'Mocktail 2' },
                { strDrink: 'Cocktail 1' },
                { strDrink: 'Cocktail 2' }
            ]
        };

        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve(mockData),
        });

        act(() => {
            result.current.handleInputChange({ target: { value: 'Cocktail' } });
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(result.current.searchResults.length).toEqual(2);

        act(() => {
            result.current.handleInputChange({ target: { value: '' } });
        });

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(result.current.searchResults.length).toEqual(0);
    });
});
