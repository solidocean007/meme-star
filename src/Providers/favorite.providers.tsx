import { useEffect, useState } from "react"
import { getAllFavorites, toggleFavoriteMemeQuoteAPI } from "../api/favorites/create-favorite";

export const FavoritesProvider = ({children})=> {
  const [favorites, setFavorites] = useState([]);

  const refetch = () => {
    getAllFavorites().then(setFavorites);
  }

  useEffect(()=> {
    refetch();
  },[]);

  const toggleFavorite = ({userId, memeQuoteId}) => {
    return toggleFavoriteMemeQuoteAPI({userId, memeId}).then(()=>{
      refetch();
    });
  };

  return (
    <Favorites.Provider 
      value={[
        favorites,
        setFavorites,
        toggleFavorite,
      ]}
    >
      {children}

    </Favorites.Provider>
  )
};

export const useFavorites = () => {
  //state management to get the state of favorites, using redux not context
  // const context = useContext(Favorites);
  // return {
    // favorites: context.favorites,
    // setFavorites: context.setFavorites,
    // toggleFavorite: useContext.toggleFavorite,
  // }
}