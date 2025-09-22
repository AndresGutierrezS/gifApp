
import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
// import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

import { useGifs } from "./gifs/hooks/usegifs"

export const GifsApp = () => {
  
  const { gifs, handleSearch, handleTermClicked, previousTerm } = useGifs();



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
