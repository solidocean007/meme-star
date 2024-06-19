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
import React, { useState } from "react";
import { LikedQuotesType, QuoteType, UsersType } from "../Utils/types";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";
import { NewQuoteType } from "./MemeCard";

interface MemeQuotesProps {
  memeId: string;
  localQuotes: QuoteType[] | undefined;
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>;
  setNewQuote: React.Dispatch<React.SetStateAction<NewQuoteType | undefined>>;
  currentUser: UsersType | null;
}

export const MemeQuotes = ({
  memeId,
  localQuotes,
  setLocalQuotes,
  setNewQuote,
  currentUser,
}: MemeQuotesProps) => {
  const [newCaption, setNewCaption] = useState("");
  if (!localQuotes || !currentUser) return null;

  const userAlreadyQuoted = localQuotes.some(
    (quote) => quote.userId === currentUser.id
  );

  const handleDeleteQuote = (quoteId: string | undefined) => {
    const updatedQuotes = localQuotes.filter((quote) => quote.id !== quoteId);
    setLocalQuotes(updatedQuotes);
  };

  const handleToggleFavoriteQuote = (targetQuote: QuoteType) => {
    let foundFavorite = false;
    const updatedQuotes = localQuotes.map(quote => {
      // Filter out the current user's like from all quotes
      const usersFavoriteQuote = quote.quoteLikes.filter(like => like.userId !== currentUser.id);
      let quoteLikes = usersFavoriteQuote;
  
      // If it's the target quote and no favorite has been added yet, add a new like
      if (!foundFavorite && quote.id === targetQuote.id) {
        const newLike: LikedQuotesType = {
          userId: currentUser.id,
          quoteId: quote.id
        };
        quoteLikes = [...usersFavoriteQuote, newLike];
        foundFavorite = true; // Ensures only one like can be added
      }
  
      return { ...quote, quoteLikes };
    });
  
    setLocalQuotes(updatedQuotes);
  };
  
  
  

  const handleSubmitNewQuote = (memeId: string) => {
    if (newCaption) {
      const newQuote: QuoteType = {
        memeId: memeId,
        text: newCaption,
        userId: currentUser?.id,
        userNameQuote: `${currentUser?.firstName} ${currentUser?.lastName}`,
        quoteLikes: [],
      };
      setNewQuote(newQuote);
      setNewCaption("");
    }
  };

  const currentUsersQuote = (quote: QuoteType) => {
    return quote.userId === currentUser.id;
  };

  return (
    <CardContent>
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
            {currentUser && currentUsersQuote(quote) ? (
              <IconButton
                onClick={() => {
                  handleDeleteQuote(quote.id);
                }}
              >
                <Delete />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  handleToggleFavoriteQuote(quote);
                }}
              >
                {quote.quoteLikes.some(
                  (like) => like.userId === currentUser?.id
                ) ? (
                  <FavoriteBorder />
                ) : (
                  <Favorite />
                )}
              </IconButton>
            )}
            <Typography>{quote.quoteLikes.length}</Typography>
          </ListItem>
        ))}
      </List>
      {!userAlreadyQuoted && (
        <Box sx={{ my: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add your two cents here"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
          />
          <Button onClick={handleSubmitNewQuote(memeId)} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      )}
    </CardContent>
  );
};
