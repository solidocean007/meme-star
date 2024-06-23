// applyChanges.ts
import { ChangeType } from "../Utils/types";
import { addLikedQuote } from "../api/addLikedQuote";
import { createQuote } from "../api/createQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";
import { AppDispatch } from "../Redux/store";
import { deleteQuoteFromDB } from "../api/deleteQuoteFromDB";
import { addLikedQuoteToRedux, addQuoteToRedux, deleteQuoteFromRedux, removeLikedQuoteFromRedux } from "../Redux/memeSlice";

interface ApplyChangesProps {
  pendingChanges: ChangeType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  dispatch: AppDispatch;
}

// export const applyChanges = ({
//   pendingChanges,
//   setPendingChanges,
//   dispatch,
// }: ApplyChangesProps) => {
//   if (!pendingChanges || pendingChanges.length === 0) {
//     return;
//   }
//   pendingChanges.forEach((change) => {
//     switch (change.type) {
//       case "addLikedQuote":
//       case "deleteLikedQuote":
//         // Now TypeScript knows `change.data` is `LikedQuotesType`
//         if (change.type === "addLikedQuote") {
//           addLikedQuote(change.data);
//           {change.data.id &&  dispatch(
//             addLikedQuoteToRedux({
//               id: change.data.id,
//               memeId: change.data.memeId,
//               quoteId: change.data.quoteId,
//               userId: change.data.userId,
//             })
//           );}
//         } else {
//           deleteLikedQuote(change.data) // the payload needs to be adjusted to only need the likedQuote.id
//             .then(()=> {
//               dispatch(removeLikedQuoteFromRedux(change.data));
//                 })
//             .catch((error) => console.error("Error", error));
//             break;
//       case "addQuote":
//         // TypeScript knows `change.data` is `QuoteType`
//         createQuote(change.data);
//         break;
//       case "deleteQuote":
//         // TypeScript knows exactly what `change.data` is
//         deleteQuoteFromDB(change.data.quoteId); // Argument of type 'string' is not assignable to parameter of type '{ memeId: string; quoteId: string; }'
//         break;
//     }
//   });
//   setPendingChanges([]);
// };

export const applyChanges = ({
  pendingChanges,
  setPendingChanges,
  dispatch,
}: ApplyChangesProps) => {
  if (pendingChanges.length === 0) {
    return;
  }

  pendingChanges.forEach((change) => {
    switch (change.type) {
      case "addLikedQuote":
        addLikedQuote(change.data)
          .then((response) => { 
            dispatch(addLikedQuoteToRedux({
              id: response.id,
              memeId: change.data.memeId, // why not use response here?
              quoteId: change.data.quoteId, // same
              userId: change.data.userId, // same
            }));
          })
          .catch((error) => console.error("Error adding liked quote:", error));
        break;
      case "deleteLikedQuote":
        deleteLikedQuote(change.data.likedQuoteId)
          .then(() => {
            dispatch(removeLikedQuoteFromRedux({likedQuoteId: change.data.likedQuoteId}));
          })
          .catch((error) => console.error("Error deleting liked quote:", error));
        break;
      case "addQuote":
        createQuote(change.data)
          .then((result) => addQuoteToRedux({
            id: result.id,
            memeId: change.data.memeId,
            text: change.data.text,
            userId: change.data.userId,
            userNameQuote: change.data.userNameQuote,
            quoteLikes: change.data.quoteLikes
          }))
          .catch((error) => console.error("Error creating quote:", error));
        break;
      case "deleteQuote":
        deleteQuoteFromDB(change.data.quoteId)
          .then(() => {
            dispatch(deleteQuoteFromRedux({memeId: change.data.memeId , quoteId: change.data.quoteId}));
          })
          .catch((error) => console.error("Error deleting quote from DB:", error));
        break;
      default:
        console.error("Unhandled change type:", change.type);
    }
  });

  setPendingChanges([]);
};

