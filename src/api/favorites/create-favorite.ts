import { API_CONFIG } from "../config";


// export const createFavoriteQuote = ({userId, memeQuoteId}) => fetch(API_CONFIG.baseUrl + '/favorites', {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({userId, memeId}),
// }).then(response)=> {
//   if(!response.ok){
//     throw new Error(" Failed to create favorite");
//   }
//   return Response;
// });

// export const deleteFavorite = (id:string) => fetch(API_CONFIG.baseUrl + '/favorites' + id, {
//   method: "DELETE",
// }).then((response)=> {
//   if(!response.ok){
//     throw new Error("Failed to delete Favorite" + id);
//   }
//   return response;
// });

// // i need to be able to toggle if i like a memequote
// // get all of the favorited quotes
// // find where i like a quote
// export const toggleFavoriteMemeQuoteAPI = async ({userId, quoteId}) => {
//   const allFavorites = await getAllFavorites();
//   const matchingFavorite = allFavorites.find((favorite) => {
//     favorite.userId == userId && favorite.memeQuoteId == memeId)
// });

//   if(!matchingFavorite){
//     //create favorite
//     return await createFavoriteQuote({userId, movieId});
//   }
  
//   return await deleteFavorite(matchingFavorite.id)

// }