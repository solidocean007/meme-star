// applyChanges.ts
import { deleteQuote } from "../Redux/memeSlice";
import { ChangeType } from "../Utils/types";
import { addLikedQuote } from "../api/addLikedQuote";
import { createQuote } from "../api/createQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";

interface ApplyChangesProps {
  pendingChanges: ChangeType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
}

export const applyChanges =({pendingChanges, setPendingChanges} : ApplyChangesProps) => {
  pendingChanges.forEach(change => {
    switch (change.type) {
      case "addLike":
      case "removeLike":
        // Now TypeScript knows `change.data` is `LikedQuotesType`
        if (change.type === "addLike") {
          addLikedQuote(change.data);
        } else {
          deleteLikedQuote(change.data.quoteId); // Adjust according to API needs
        }
        break;
      case "addQuote":
        // TypeScript knows `change.data` is `QuoteType`
        createQuote(change.data);
        break;
      case "deleteQuote":
        // TypeScript knows exactly what `change.data` is
        deleteQuote(change.data.quoteId); // Argument of type 'string' is not assignable to parameter of type '{ memeId: string; quoteId: string; }'
        break;
    }
  });
  setPendingChanges([]);
}