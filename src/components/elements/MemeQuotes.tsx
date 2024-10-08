import {
  Box,
  Button,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { ChangeType, QuoteType, UsersType, LikedQuotesType } from "../../Utils/types";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { toggleFavoriteQuote } from "../../MemeQuoteHelperFunctions/toggleFavoriteQuote";
import { createChangeToDeleteUserQuote } from "../../MemeQuoteHelperFunctions/createChangeToDeleteUserQuote";
import { deleteLikesForDeletedQuote } from "../../MemeQuoteHelperFunctions/deleteLikesForDeletedQuote";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
// import { toggleFavoriteQuote } from "../helperFunctions/MemeQuoteHelperFunctions/toggleFavoriteQuote";
// import { createChangeToDeleteUserQuote } from "../helperFunctions/MemeQuoteHelperFunctions/createChangeToDeleteUserQuote";
// import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
// import { deleteLikesForDeletedQuote } from "../helperFunctions/MemeQuoteHelperFunctions/deleteLikesForDeletedQuote";

interface MemeQuotesProps {
  localQuotes: QuoteType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
  pendingChanges: ChangeType[];
  memeId: string | undefined;
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
  const theme = useTheme<Theme>();

  const handleOpenConfirmDelete = (quote: QuoteType) => {
    setQuoteToDelete(quote);
    setOpenDeleteConfirm(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenDeleteConfirm(false);
    setQuoteToDelete(null);
  };

  if (!localQuotes || !currentUser) return null;

  const userAlreadyQuoted = localQuotes.some(
    (quote) => quote.userId === currentUser.id
  );

  const currentUsersQuote = (quote: QuoteType) => {
    return quote.userId === currentUser.id;
  };

  const handleToggleFavoriteQuote = (quote: QuoteType, memeId: string | undefined) => {
    if(!memeId){
      return;
    }
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
    memeId: string | undefined
  ) => {
    if (!quoteToDelete.id || !currentUser || !memeId) return;
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

  const handleSubmitNewQuote = (memeId: string | undefined) => {
    if(!memeId){
      return;
    }
    if (newQuoteText && currentUser.id) {
      const newChange: ChangeType = {
        type: "addQuote",
        data: {
          id: undefined,
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

  const listStyle = {
    width: "100%",
    color: theme.palette.text.primary,
  };

  return (
    <>
      <CardContent sx={{ padding: "0", width: "100%" }}>
        <List sx={listStyle}>
          {localQuotes?.map((quote, index) => (
            <>
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
                    (like : LikedQuotesType) => like.userId === currentUser?.id
                  ) ? (
                    <Favorite sx={{ color: "green" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
                <Typography>{quote.quoteLikes.length}</Typography>
                <Box sx={{ width: 15 }}>
                  {currentUser && currentUsersQuote(quote) && (
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() => {
                          handleOpenConfirmDelete(quote);
                        }}
                      >
                        <Delete sx={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
        {!userAlreadyQuoted && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center", my: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Add your two cents here"
              value={newQuoteText}
              onChange={(e) => setNewQuoteText(e.target.value)}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)", // Placeholder color
                    opacity: 1, // Ensure the placeholder is fully visible
                  },
                  color: "white", // Text color
                },
                classes: {
                  notchedOutline: "MuiOutlinedInput-notchedOutline", // You can add specific classes if needed
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white", // This controls the label color
                },
              }}
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
        messageQuestion="The quote will be permanently deleted."
      />
    </>
  );
};
