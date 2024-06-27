import { ChangeType, QuoteType, UsersType } from "../../Utils/types";
import { findAnyPendingChangeForQuote } from "./findAnyPendingChangeForQuote";

const userLikesQuote = (quote: QuoteType, currentUser: UsersType) => {
  return quote.quoteLikes.find(
    (likedQuote) => likedQuote.userId === currentUser.id
  );
};

export const toggleFavoriteQuote = (
  targetQuote: QuoteType,
  currentUser: UsersType,
  memeId: string,
  pendingChanges: ChangeType[],
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>,
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>,
  localQuotes: QuoteType[]
) => {
  if (!currentUser.id) return;
  const alreadyLiked = userLikesQuote(targetQuote, currentUser);
  let newChange: ChangeType | null = null;

  if (!alreadyLiked && targetQuote.id) {
    newChange = {
      type: "addLikedQuote",
      data: {
        userId: currentUser.id,
        quoteId: targetQuote.id,
        memeId: memeId,
        id: undefined, // The id will be set by the server upon actual creation
      },
    };
  } else if (alreadyLiked?.id) {
    newChange = {
      type: "deleteLikedQuote",
      data: { memeId: alreadyLiked.memeId, likedQuoteId: alreadyLiked.id },
    };
  } else if (!targetQuote.id) {
    // what happens if the user just made this quote and we cant make a new change for addLikedQuote becuase we cant assign a quoteId
  }

  const existingChanges = findAnyPendingChangeForQuote(
    targetQuote,
    pendingChanges
  );

  // Clear all other pending changes for the quote
  if (existingChanges.length > 0) {
    const updatedChanges = pendingChanges.filter(change => !existingChanges.includes(change));
    setPendingChanges(updatedChanges);
  } else if (newChange) {
    setPendingChanges(prev => [...prev, newChange]);
  }
  

  // Update local quotes optimistically
  setLocalQuotes(
    localQuotes.map((quote) => {
      if (quote.id === targetQuote.id) {
        const updatedQuoteLikes =
          newChange?.type === "addLikedQuote"
            ? [...quote.quoteLikes, { ...newChange.data }] // Add a temporary placeholder for new likes
            : quote.quoteLikes.filter((like) => like.id !== alreadyLiked?.id); // Remove the like if it exists

        return { ...quote, quoteLikes: updatedQuoteLikes };
      }
      return quote;
    })
  );
};
