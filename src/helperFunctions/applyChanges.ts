// applyChanges.ts
import { ChangeType, QuoteType } from "../Utils/types";
import { addLikedQuote } from "../api/addLikedQuote";
import { createQuote } from "../api/createQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";
import { AppDispatch } from "../Redux/store";
import { deleteQuoteFromDB } from "../api/deleteQuoteFromDB";
import {
  addLikedQuoteToRedux,
  addQuoteToRedux,
  deleteQuoteFromRedux,
  removeLikedQuoteFromRedux,
} from "../Redux/memeSlice";
import { showSnackbar } from "../Redux/snackBarSlice";

interface ApplyChangesProps {
  pendingChanges: ChangeType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  dispatch: AppDispatch;
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>;
  // setMessage: React.Dispatch<React.SetStateAction<string>>;
  // setMessageType: React.Dispatch<React.SetStateAction<"error" | "success">>;
}

export const applyChanges = ({
  pendingChanges,
  setPendingChanges,
  dispatch,
  setLocalQuotes,
  // setMessage,
  // setMessageType,
}: ApplyChangesProps) => {
  if (pendingChanges.length === 0) {
    return;
  }

  pendingChanges.forEach((change) => {
    switch (change.type) {
      case "addLikedQuote":
        addLikedQuote(change.data)
          .then((response) => {
            if (response && response.data) {
              dispatch(
                addLikedQuoteToRedux({
                  id: response.id,
                  memeId: response.data.memeId,
                  quoteId: response.data.quoteId,
                  userId: response.data.userId,
                })
              );
            } else {
              setLocalQuotes((prev) =>
                prev.filter((quote) => quote.id !== change.data.id)
              );
            }
          })
          .catch((error) => console.error("Error adding liked quote:", error));
        break;
      case "deleteLikedQuote":
        deleteLikedQuote(change.data.likedQuoteId)
          .then(() => {
            dispatch(
              removeLikedQuoteFromRedux({
                likedQuoteId: change.data.likedQuoteId,
              })
            );
          })
          .catch((error) =>
            console.error("Error deleting liked quote:", error)
          );
        break;
      case "addQuote":
        createQuote(change.data)
          .then((result) => {
            dispatch(
              addQuoteToRedux({
                id: result.id,
                memeId: change.data.memeId,
                text: change.data.text,
                userId: change.data.userId,
                userNameQuote: change.data.userNameQuote,
                quoteLikes: change.data.quoteLikes,
              })
            );
            dispatch(showSnackbar({ message: "Your quote was added!", type: "success" }));
          })
          .catch((error) => {
            console.error("Error creating quote:", error);
            dispatch(showSnackbar({ message: "An error occurred while adding your quote.", type: "error" }));
          });
        break;
      case "deleteQuote":
        deleteQuoteFromDB(change.data.quoteId)
          .then(() => {
            dispatch(
              deleteQuoteFromRedux({
                memeId: change.data.memeId,
                quoteId: change.data.quoteId,
              })
            );
            dispatch(showSnackbar({ message: "Your quote was deleted", type: "success" }));
          })
          .catch((error) => {
            console.error("Error deleting quote from DB:", error);
            dispatch(showSnackbar({ message: "An error occurred while deleting your quote.", type: "error" }));
          });
        break;
      default:
        console.error("Unhandled change type:", change);
    }
  });

  setPendingChanges([]);
};
