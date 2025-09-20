import { useState } from "react"
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action"
import type { Gif } from "./gifs/interfaces/gif.interface"

export const GifsApp = () => {
  
  const [previousTerm, setPreviousTerm] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);
  
  const handleTermClicked = (term: string) => {
    console.log(term);
  }

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    if ( previousTerm.includes(query) ) return;

    setPreviousTerm([query, ...previousTerm].splice(0, 8));

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
  }



    return (
        <>
            <CustomHeader 
                title="Gifs Searcher"
                description="Find and share the best gifs" 
            />
            
            <SearchBar 
              placeHolder="Search Gifs"
              onQuery={handleSearch}
            />

            <PreviousSearches 
                searches={previousTerm}
                onLabelClicked={handleTermClicked}
            />

            <GifList gifs={gifs}/>
        </>
  )
}
