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

interface MemeQuotesProps {
  localQuotes: QuoteType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  pendingChanges: ChangeType[];
  memeId: string;
  currentUser: UsersType | null;
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>;
  handleClose: () => void;
}

export const MemeQuotes = ({
  localQuotes,
  setPendingChanges,
  pendingChanges,
  memeId,
  currentUser,
  setLocalQuotes,
  handleClose,
}: MemeQuotesProps) => {
  const [newQuoteText, setNewQuoteText] = useState("");
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [quoteToDelete, setQuoteToDelete] = useState<QuoteType | null>(null);

  const handleOpenConfirmDelete = (quote: QuoteType) => {
    setQuoteToDelete(quote);
    setOpenDeleteConfirm(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenDeleteConfirm(false);
    setQuoteToDelete(null);
  };

  useEffect(() => {}, [pendingChanges, localQuotes]);

  if (!localQuotes || !currentUser) return null;

  const userAlreadyQuoted = localQuotes.some(
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

  const handleDeleteUserQuote = async (
    quoteToDelete: QuoteType,
    memeId: string
  ) => {
    if (!quoteToDelete.id || !currentUser) return;
    createChangeToDeleteUserQuote(
      quoteToDelete,
      memeId,
      currentUser,
      pendingChanges,
      setPendingChanges
    );

    const likedQuoteIds = await deleteLikesForDeletedQuote(quoteToDelete.id);

    const likedQuoteChanges: ChangeType[] = likedQuoteIds.map(
      (likedQuoteId) => ({
        type: "deleteLikedQuote",
        data: { likedQuoteId, memeId },
      })
    );
    setPendingChanges((changes) => [...changes, ...likedQuoteChanges]);
    setLocalQuotes((currentQuotes) =>
      currentQuotes.filter((quote) => quote.id !== quoteToDelete.id)
    );
    handleClose();
  };

  const handleSubmitNewQuote = (memeId: string) => {
    if (newQuoteText && currentUser.id) {
      const newChange: ChangeType = {
        type: "addQuote",
        data: {
          memeId: memeId,
          text: newQuoteText,
          userId: currentUser?.id,
          userNameQuote: `${currentUser?.firstName} ${currentUser?.lastName}`,
          quoteLikes: [],
        },
      };
      setPendingChanges((prev) => [...prev, newChange]);
      setLocalQuotes((prev) => [...prev, newChange.data]);
      setNewQuoteText("");
      handleClose();
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
