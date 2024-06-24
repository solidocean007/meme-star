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
              memeId: response.data.memeId,
              quoteId: response.data.quoteId,
              userId: response.data.userId,
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
        console.error("Unhandled change type:", change);
    }
  });

  setPendingChanges([]);
};

