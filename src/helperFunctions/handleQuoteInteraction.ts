// handleQuoteInteraction.ts
import { useAppSelector } from "../Redux/hook";
import { RootState } from "../Redux/store";
import { QuoteType } from "../Utils/types";
import { addLikedQuote } from "../api/addLikedQuote";

export const handleInteraction = async (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  quote: QuoteType,
  action: "like" | "unlike" | "delete"
) => {
  console.log("Event target:", event.target); // Check what is being clicked
  console.log("Event currentTarget:", event.currentTarget); // The element that has the event listener
  // event.preventDefault();
  // event.stopPropagation();

  setLoading(true);
  try {
    switch (action) {
      case "like": {
        const likeResponse = await addLikedQuote(quote, currentUser.id);
        await addLikedQuote(quote, currentUser.id);
        dispatch(
          updateLikedQuotes({
            memeId: quote.memeId,
            quoteId: quote.id,
            likedQuote: likeResponse,
            action: "like",
          })
        );
        handleOpen();

        break;
      }
      case "unlike": {
        const likedQuote = quote.quoteLikes.find(
          (like) => like.userId === currentUser.id
        );
        if (likedQuote) {
          await deleteLikedQuote(likedQuote.id);
          dispatch(
            updateLikedQuotes({
              memeId: quote.memeId,
              quoteId: quote.id,
              likedQuote: likedQuote,
              action: "unlike",
            })
          );
          handleOpen();
        }
        break;
      }
      case "delete": {
        await deleteQuote(quote.id);
        dispatch(
          deleteQuoteRedux({ memeId: quote.memeId, quoteId: quote.id })
        );
        handleOpen();

        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Error during interaction:", error);
    alert(`Error: ${error}`);
  } finally {
    setLoading(false);
  }
};