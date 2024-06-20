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
import { ChangeType, QuoteType, UsersType } from "../Utils/types";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";

interface MemeQuotesProps {
  localQuotes: QuoteType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>
  memeId: string;
  currentUser: UsersType | null;
  setLocalQuotes: React.Dispatch<React.SetStateAction<QuoteType[]>>
}

export const MemeQuotes = ({
  localQuotes,
  setPendingChanges,
  memeId,
  currentUser,
  setLocalQuotes,
}: MemeQuotesProps) => {
  const [newQuoteText, setNewQuoteText] = useState("");
  if (!localQuotes || !currentUser) return null;

  const userAlreadyQuoted = localQuotes.some(
    (quote) => quote.userId === currentUser.id
  );

  const handleToggleFavoriteQuote = (quote: QuoteType) => {
    const alreadyLiked = quote.quoteLikes.some(like => like.userId === currentUser.id);
    const newChange: ChangeType = {
      type: alreadyLiked ? "removeLike" : "addLike",
      data: {
        userId: currentUser.id,
        quoteId: quote.id,
      }
    };
  
    setPendingChanges(prev => [...prev, newChange]);
  
    // Optimistically update local state
    const updatedQuotes = localQuotes.map(q => {
      if (q.id === quote.id) {
        const updatedLikes = alreadyLiked
          ? q.quoteLikes.filter(like => like.userId !== currentUser.id)
          : [...q.quoteLikes, { userId: currentUser.id, quoteId: quote.id }];
        return { ...q, quoteLikes: updatedLikes };
      }
      return q;
    });
    setLocalQuotes(updatedQuotes);
  };
  
  

  const handleSubmitNewQuote = (memeId: string) => {
    if (newQuoteText) {
      const newChange: ChangeType = {
        type: "addQuote",
        data : {
          memeId: memeId,
          text: newQuoteText,
          userId: currentUser?.id,
          userNameQuote: `${currentUser?.firstName} ${currentUser?.lastName}`,
          quoteLikes: [],
        }
      };
      setPendingChanges(prev => [...prev, newChange]);
      setNewQuoteText("");
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
                  handleToggleFavoriteQuote(quote);
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
            value={newQuoteText}
            onChange={(e) => setNewQuoteText(e.target.value)}
          />
          <Button onClick={()=> handleSubmitNewQuote(memeId)} type="submit" variant="contained" color="primary"> 
            Submit
          </Button>
        </Box>
      )}
    </CardContent>
  );
};
