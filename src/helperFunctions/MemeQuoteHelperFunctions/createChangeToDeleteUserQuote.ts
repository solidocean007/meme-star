import { ChangeType, QuoteType, UsersType } from "../../Utils/types";
import { findAnyPendingChangeForQuote } from "./findAnyPendingChangeForQuote";

export const createChangeToDeleteUserQuote = (
  quote: QuoteType,
  memeId: string,
  currentUser: UsersType,
  pendingChanges: ChangeType[],
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>
) => {
  // create a change for this quote unless there already is one then delete that one
  if (!currentUser.id || !quote.id) return;

  const newChange: ChangeType = {
    type: "deleteQuote",
    data: { quoteId: quote.id, memeId: memeId },
  };

  // find all pending changes for this quote
  const allPendingChangesForThisQuote = findAnyPendingChangeForQuote(
    quote,
    pendingChanges
  );

  if(allPendingChangesForThisQuote.length > 0){
    const updatedChanges = allPendingChangesForThisQuote.filter((change) => !allPendingChangesForThisQuote.includes(change))
    setPendingChanges(updatedChanges);
  } else if (newChange) {
    setPendingChanges((prev) => [...prev, newChange])
  }
};
