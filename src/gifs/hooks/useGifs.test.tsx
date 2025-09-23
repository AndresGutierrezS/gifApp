import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./usegifs";
import * as gifsActions from "../actions/get-gifs-by-query.action";


describe('useGifs', () => {
    test('Should return a default values and methods', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerm.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('Should return a list of gifs', async () => {
        const { result } = renderHook(() => useGifs());
        
        await act(async () => {
            await result.current.handleSearch('naruto');
        });

        expect(result.current.gifs.length).toBe(20);
    });

    test('Should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());
        const termTest = 'naruto';

        await act(async () => {
            await result.current.handleTermClicked(termTest);
        })
        
        expect(result.current.gifs.length).toBe(20);
    });

    test('Should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGifs());
        const termTest = 'naruto';

        await act(async () => {
            await result.current.handleTermClicked(termTest);
        })
        
        expect(result.current.gifs.length).toBe(20);

        vi.spyOn(gifsActions, 'getGifsByQuery').mockRejectedValue(new Error('Custom test error'));

        await act(async () => {
            await result.current.handleTermClicked(termTest);
        });
        expect(result.current.gifs.length).toBe(20);
    });

    test('Should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());

        vi.spyOn(gifsActions, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('naruto');
        });
        await act(async () => {
            await result.current.handleSearch('naruto2');
        });
        await act(async () => {
            await result.current.handleSearch('naruto3');
        });
        await act(async () => {
            await result.current.handleSearch('naruto4');
        });
        await act(async () => {
            await result.current.handleSearch('naruto5');
        });
        await act(async () => {
            await result.current.handleSearch('naruto6');
        });
        await act(async () => {
            await result.current.handleSearch('naruto7');
        });
        await act(async () => {
            await result.current.handleSearch('naruto8');
        });
        await act(async () => {
            await result.current.handleSearch('naruto9');
        });

        expect(result.current.previousTerm.length).toBe(8);
        expect(result.current.previousTerm).toStrictEqual([
            "naruto9",
            "naruto8",
            "naruto7",
            "naruto6",
            "naruto5",
            "naruto4",
            "naruto3",
            "naruto2",
        ]);
    });
});