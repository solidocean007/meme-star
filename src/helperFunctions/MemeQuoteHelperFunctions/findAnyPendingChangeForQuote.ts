import { ChangeType, QuoteType } from "../../Utils/types";

export const findAnyPendingChangeForQuote = (quote: QuoteType, pendingChanges: ChangeType[]) => {
  // return pendingChanges.find((change) => {
  return pendingChanges.filter((change) => {
    if (change.type === "addLikedQuote") {
      return change.data.quoteId === quote.id;
    } else if (change.type === "deleteLikedQuote") {
      return change.data.likedQuoteId === quote.id;
    }
    return false;
  });
}