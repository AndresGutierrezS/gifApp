import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";


describe('getGifsByQuery', () => {
    test('Should return a list of gifs', async() => {
        const gifs = await getGifsByQuery('naruto');
        const [firstGif] = gifs;
        console.log(gifs);

        expect(firstGif).toStrictEqual({
            height: expect.any(Number),
            id: expect.any(String),
            title: expect.any(String),
            url: expect.any(String),
            width: expect.any(Number),
        })
    });
});