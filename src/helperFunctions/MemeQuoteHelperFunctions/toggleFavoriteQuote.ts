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
        id: undefined,
      },
    };
  } else if (alreadyLiked?.id) {
    newChange = {
      type: "deleteLikedQuote",
      data: { memeId: alreadyLiked.memeId, likedQuoteId: alreadyLiked.id },
    };
  }

  const existingChanges = findAnyPendingChangeForQuote(
    targetQuote,
    pendingChanges
  );

  if (existingChanges.length > 0) {
    const updatedChanges = pendingChanges.filter(change => !existingChanges.includes(change));
    setPendingChanges(updatedChanges);
  } else if (newChange) {
    setPendingChanges(prev => [...prev, newChange]);
  }
  
  setLocalQuotes(
    localQuotes.map((quote) => {
      if (quote.id === targetQuote.id) {
        const updatedQuoteLikes =
          newChange?.type === "addLikedQuote"
            ? [...quote.quoteLikes, { ...newChange.data }]
            : quote.quoteLikes.filter((like) => like.id !== alreadyLiked?.id);
        return { ...quote, quoteLikes: updatedQuoteLikes };
      }
      return quote;
    })
  );
};
