import {
  Box,
  Button,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { QuoteType, UsersType } from "../Utils/types";
import { Delete, ThumbUp, TransgenderSharp } from "@mui/icons-material";
import { deleteQuote } from "../api/deleteQuote";

interface MemeQuotesProps {
  quotes: QuoteType[] | undefined;
  currentUser: UsersType;
}

export const MemeQuotes = ({ quotes, currentUser }: MemeQuotesProps) => {
  const [newCaption, setNewCaption] = useState("");
  if (!quotes) return null;
  console.log(quotes);

  // const findCurrentUserQuote = (quotes).find((quote: QuoteType) => quote.userId === currentUser.id )
  // Determine if the user has already submitted a quote
  const userAlreadyQuoted =
    quotes?.some((quote) => quote.userId === currentUser.id) ?? false;

  const handleDeleteQuote =async (quoteId: string) => {
    try {
      await deleteQuote(quoteId);
      alert(`${message}`)
    } catch {
      error?
    }
  };

  const toggleLikeQuote = () => {
    return;
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
        {quotes && quotes.length > 0 ? (
          quotes.map((quote, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={quote.text}
                secondary={`by ${quote.userNameQuote}`}
              />
              {quote.userId === currentUser.id ? (
                <IconButton onClick={handleDeleteQuote}>
                  <Delete />
                </IconButton>
              ) : (
                <IconButton onClick={toggleLikeQuote}>
                  <ThumbUp />
                </IconButton>
              )}
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No quotes available for this meme." />
          </ListItem>
        )}
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
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      )}
    </CardContent>
  );
};
