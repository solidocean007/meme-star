import {
  Box,
  Button,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChangeType, QuoteType, UsersType } from "../Utils/types";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { toggleFavoriteQuote } from "../helperFunctions/MemeQuoteHelperFunctions/toggleFavoriteQuote";
import { createChangeToDeleteUserQuote } from "../helperFunctions/MemeQuoteHelperFunctions/createChangeToDeleteUserQuote";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { deleteLikesForDeletedQuote } from "../helperFunctions/MemeQuoteHelperFunctions/deleteLikesForDeletedQuote";
import { v4 as uuidv4 } from 'uuid';

interface MemeQuotesProps {
  localQuotes: QuoteType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  pendingChanges: ChangeType[];
  memeId: string;
  currentUser: UsersType | null;
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>;
}

export const MemeQuotes = ({
  localQuotes,
  setPendingChanges,
  pendingChanges,
  memeId,
  currentUser,
  setLocalQuotes,
}: MemeQuotesProps) => {
  const [newQuoteText, setNewQuoteText] = useState(""); // state of the text field for adding a new quote
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<QuoteType | null>(null);

  const handleOpenConfirmDelete = (quote: QuoteType) => {
    setQuoteToDelete(quote);
    setOpenDeleteConfirm(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenDeleteConfirm(false);
    setQuoteToDelete(null); // Reset the quoteToDelete when closing the dialog
  };

  useEffect(() => {
    console.log("pendingChanges: ", pendingChanges);
    console.log("localQuotes: ", localQuotes);
  }, [pendingChanges, localQuotes]);

  if (!localQuotes || !currentUser) return null; // if there are no quotes available close this component

  const userAlreadyQuoted = localQuotes.some(
    // this returns the quote that was created by the user.
    (quote) => quote.userId === currentUser.id
  );

  const currentUsersQuote = (quote: QuoteType) => {
    return quote.userId === currentUser.id;
  };

  const handleToggleFavoriteQuote = (quote: QuoteType, memeId: string) => {
    toggleFavoriteQuote(
      quote,
      currentUser,
      memeId,
      pendingChanges,
      setPendingChanges,
      setLocalQuotes,
      localQuotes
    );
  };

  const handleConfirmDelete = () => {
    if (quoteToDelete) {
      handleDeleteUserQuote(quoteToDelete, quoteToDelete.memeId);
      handleCloseConfirmDelete();
    }
  };

  const handleDeleteUserQuote = async (quoteToDelete: QuoteType, memeId: string) => {
    if (!quoteToDelete.id || !currentUser) return;
  
    createChangeToDeleteUserQuote(
      quoteToDelete,
      memeId,
      currentUser,
      pendingChanges,
      setPendingChanges
    );
  
    // Await the fetching of liked quote ids
    const likedQuoteIds = await deleteLikesForDeletedQuote(quoteToDelete.id);
  
    // Create a change for each liked quote deletion
    const likedQuoteChanges: ChangeType[] = likedQuoteIds.map(likedQuoteId => ({
      type: "deleteLikedQuote",
      data: { likedQuoteId, memeId },
    }));
  
    // Add these changes to pendingChanges
    setPendingChanges(changes => [...changes, ...likedQuoteChanges]);
  
    // Correctly update the localQuotes to exclude the deleted quote
    setLocalQuotes(currentQuotes =>
      currentQuotes.filter(quote => quote.id !== quoteToDelete.id)
    );
  };
  
  const handleSubmitNewQuote = (memeId: string) => {
    if (newQuoteText && currentUser.id) {
      const tempId = uuidv4();
      const newChange: ChangeType = {
        type: "addQuote",
        data: {
          id: tempId,
          memeId: memeId,
          text: newQuoteText,
          userId: currentUser?.id,
          userNameQuote: `${currentUser?.firstName} ${currentUser?.lastName}`,
          quoteLikes: [],
        },
      };
      setPendingChanges((prev) => [...prev, newChange]);
      setLocalQuotes((prev) => [...prev, newChange.data])
      setNewQuoteText("");
    }
  };

  return (
    <>
      <CardContent sx={{ padding: "0" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
          {localQuotes?.map((quote, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={quote.text}
                secondary={`by ${quote.userNameQuote}`}
              />

              <IconButton
                onClick={() => {
                  {
                    currentUser && handleToggleFavoriteQuote(quote, memeId);
                  }
                }}
              >
                {quote.quoteLikes.length > 0 &&
                quote.quoteLikes.some(
                  (like) => like.userId === currentUser?.id
                ) ? (
                  <Favorite sx={{ color: "green" }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              <Typography>{quote.quoteLikes.length}</Typography>
              <Box sx={{ width: 15 }}>
                {currentUser && currentUsersQuote(quote) && (
                  <IconButton
                    onClick={() => {
                      handleOpenConfirmDelete(quote);
                    }}
                  >
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
        {!userAlreadyQuoted && (
          <Box sx={{ my: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add your two cents here"
              value={newQuoteText}
              onChange={(e) => setNewQuoteText(e.target.value)}
            />
            <Button
              onClick={() => handleSubmitNewQuote(memeId)}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        )}
      </CardContent>
      <DeleteConfirmationDialog
        open={openDeleteConfirm}
        onClose={handleCloseConfirmDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

// const removePendingChange = (pendingChange: ChangeType) => {
//   return pendingChanges.filter((change) => {
//     return change.type === "addLikedQuote"
//       ? change.data.quoteId !==
//           (pendingChange.data as LikedQuotesType).quoteId
//       : change.type === "deleteLikedQuote"
//       ? change.data.likedQuoteId !==
//         (pendingChange.data as { likedQuoteId: string }).likedQuoteId
//       : true;
//   });
// };

// const createNewChange = (quote: QuoteType) => {
//   const usersLikedQuoteObj = userLikesQuote(quote);
//   // create a newChange of type removeLike and set it to pending changes
//   if (!usersLikedQuoteObj && currentUser.id && quote.id) {
//     return {
//       // define a newChange that is of the type of adding a likedQuote object
//       type: "addLikedQuote", // add type of action.  may not be necessary anymore
//       data: {
//         // define the newLikedObject with its necessary props minus id which is created on fetch PUT
//         userId: currentUser.id,
//         quoteId: quote.id,
//         memeId: memeId,
//       },
//     };
//   } else if (usersLikedQuoteObj && usersLikedQuoteObj.id) {
//     // if the user likes this quote create a change to delete it
//     return {
//       type: "deleteLikedQuote",
//       data: {
//         likedQuoteId: usersLikedQuoteObj.id,
//       },
//     };
//   }
//   return null;
// };
