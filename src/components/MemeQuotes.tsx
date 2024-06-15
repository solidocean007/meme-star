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
import { useAppDispatch } from "../Redux/hook";
import { updateLikedQuotes } from "../Redux/memeSlice";

interface MemeQuotesProps {
  quotes: QuoteType[] | undefined;
  currentUser: UsersType | null;
}

export const MemeQuotes = ({ quotes, currentUser }: MemeQuotesProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  if (!quotes || !currentUser) return null;

  const userAlreadyQuoted = quotes.some((quote) => quote.userId === currentUser.id);

  const handleInteraction = async (
    quote: QuoteType,
    action: "like" | "unlike" | "delete"
  ) => {
    setLoading(true);
    try {
      switch (action) {
        case "like":
          await addLikedQuote(quote, currentUser.id);
          dispatch(updateLikedQuotes({ memeId: quote.memeId, quoteId: quote.id, userId: currentUser.id, action: 'like' }));
          break;
          case "unlike": {
            const likeId = quote.quoteLikes.find(like => like.userId === currentUser.id)?.id;
            if (likeId) {
              await deleteLikedQuote(likeId);
              dispatch(updateLikedQuotes({ memeId: quote.memeId, quoteId: quote.id, userId: currentUser.id, action: 'unlike' }));
            }
          break;
        case "delete":
          await deleteQuote(quote.id)
          dispatch(deleteQuote())// dont i need to update redux here?
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
            {quotes.map((quote, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={quote.text}
                  secondary={`by ${quote.userNameQuote}`}
                />
                {quote.userId === currentUser.id ? (
                  <IconButton onClick={() => handleInteraction(quote, "delete")}>
                    <Delete />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleInteraction(
                      quote,
                      quote.quoteLikes.some(like => like.userId === currentUser.id) ? "unlike" : "like"
                    )}
                  >
                    {quote.quoteLikes.some(like => like.userId === currentUser.id) ? <ThumbDown /> : <ThumbUp />}
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
