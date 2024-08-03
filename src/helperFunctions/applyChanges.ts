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
  deleteMemeFromRedux,
  deleteQuoteFromRedux,
  removeLikedQuoteFromRedux,
} from "../Redux/memeSlice";
import { showSnackbar } from "../Redux/snackBarSlice";
import { deleteMeme } from "../api/deleteMeme";
import { deleteQuotesByMemeId } from "./deleteQuotesByMemeId";
import { deleteLikedQuotesByMemeId } from "./deleteLikedQuotesByMemeId";

interface ApplyChangesProps {
  pendingChanges: ChangeType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  dispatch: AppDispatch;
  setLocalQuotes?: React.Dispatch<React.SetStateAction<QuoteType[]>>;
}

export const applyChanges = async ({
  pendingChanges,
  setPendingChanges,
  dispatch,
  setLocalQuotes,
}: ApplyChangesProps) => {
  if (pendingChanges.length === 0) {
    return;
  }
  console.log(pendingChanges);

  for (const change of pendingChanges) {
    try {
      switch (change.type) {
        case "addLikedQuote":{
          const addLikedResponse = await addLikedQuote(change.data);
          if (addLikedResponse) {
            dispatch(
              addLikedQuoteToRedux({
                id: addLikedResponse.id,
                memeId: addLikedResponse.memeId,
                quoteId: addLikedResponse.quoteId,
                userId: addLikedResponse.userId,
              })
            );
          } else {
            console.log("Failed to add liked quote, removing from local state:", change.data.id);
            if(setLocalQuotes){setLocalQuotes((prev) =>
              prev.filter((quote) => quote.id !== change.data.id)
            );}
          }
          break;
        }
        case "deleteLikedQuote": {
          await deleteLikedQuote(change.data.likedQuoteId);
          dispatch(
            removeLikedQuoteFromRedux({
              memeId: change.data.memeId,
              likedQuoteId: change.data.likedQuoteId,
            })
          );
          break;
        }
        case "addQuote": {
          const createQuoteResponse = await createQuote(change.data);
          dispatch(
            addQuoteToRedux({
              id: createQuoteResponse.id,
              memeId: change.data.memeId,
              text: change.data.text,
              userId: change.data.userId,
              userNameQuote: change.data.userNameQuote,
              quoteLikes: change.data.quoteLikes,
            })
          );
          dispatch(showSnackbar({ message: "Your quote was added!", type: "success" }));
          break;
        }
        case "deleteQuote": {
          await deleteQuoteFromDB(change.data.quoteId);
          dispatch(
            deleteQuoteFromRedux({
              memeId: change.data.memeId,
              quoteId: change.data.quoteId,
            })
          );
          dispatch(showSnackbar({ message: "Your quote was deleted", type: "success" }));
          break;
        }
        case "deleteMeme": {
          await deleteMeme(change.data.memeId);
          // const deletedQuoteIds = await deleteQuotesByMemeId(change.data.memeId);
          const deletedLikedQuoteIds = await deleteLikedQuotesByMemeId(change.data.memeId);

          // deletedQuoteIds.forEach(quoteId => {
          //   dispatch(deleteQuoteFromRedux({ memeId: change.data.memeId, quoteId }));
          // });

          deletedLikedQuoteIds.forEach(likedQuoteId => {
            dispatch(removeLikedQuoteFromRedux({ memeId: change.data.memeId, likedQuoteId }));
          });

          dispatch(deleteMemeFromRedux({ memeId: change.data.memeId }));
          dispatch(showSnackbar({ message: "Meme deleted successfully", type: "success" }));
          break;
        }
        default:
          console.error("Unhandled change type:", change);
      }
    } catch (error) {
      console.error(`Error processing ${change.type}:`, error);
      dispatch(showSnackbar({ message: `An error occurred while processing ${change.type}.`, type: "error" }));
    }
  }

  setPendingChanges([]);
};

