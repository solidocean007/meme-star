// MemeQuotes.tsx
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { QuoteType, UsersType } from "../Utils/types";
import { Delete, ThumbDown, ThumbUp } from "@mui/icons-material";
import { deleteQuote } from "../api/deleteQuote";
import { addLikedQuote } from "../api/addLikedQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";

interface MemeQuotesProps {
  quotes: QuoteType[] | undefined;
  currentUser: UsersType;
}

export const MemeQuotes = ({ quotes, currentUser }: MemeQuotesProps) => {
  const [loading, setLoading] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  if (!quotes) return null;

  const userAlreadyQuoted =
    quotes?.some((quote) => quote.userId === currentUser.id) ?? false;

  const handleInteraction = async (
    quote: QuoteType,
    action: "like" | "unlike" | "delete"
  ) => {
    setLoading(true);
    try {
      switch (action) {
        case "like":
          await addLikedQuote(quote, currentUser.id);
          break;
        case "unlike":
          await deleteLikedQuote(quote.id);
          break;
        case "delete":
          await deleteQuote(quote.id);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error during interaction:", error);
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
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
                    <IconButton
                      onClick={() => handleInteraction(quote, "delete")}
                    >
                      <Delete />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() =>
                        handleInteraction(
                          quote,
                          quote.quoteLikedBy.includes(currentUser.id)
                            ? "unlike"
                            : "like"
                        )
                      }
                    >
                      {quote.quoteLikedBy.includes(currentUser.id) ? (
                        <ThumbDown />
                      ) : (
                        <ThumbUp />
                      )}
                    </IconButton>
                  )}
                  <Typography>{quote.quoteLikedBy.length}</Typography>
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
      )}
    </div>
  );
};
