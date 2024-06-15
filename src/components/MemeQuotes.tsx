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
import React, { useState } from "react";
import { QuoteType, UsersType } from "../Utils/types";
import { Delete, ThumbDown, ThumbUp } from "@mui/icons-material";
import { deleteQuote } from "../api/deleteQuote";
import { addLikedQuote } from "../api/addLikedQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";
import { useAppDispatch } from "../Redux/hook";
import {
  updateLikedQuotes,
  deleteQuote as deleteQuoteRedux,
} from "../Redux/memeSlice";

interface MemeQuotesProps {
  quotes: QuoteType[] | undefined;
  currentUser: UsersType | null;
  handleOpen: () => void;
}

export const MemeQuotes = ({
  quotes,
  currentUser,
  handleOpen,
}: MemeQuotesProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [newCaption, setNewCaption] = useState("");
  if (!quotes || !currentUser) return null;

  const userAlreadyQuoted = quotes.some(
    (quote) => quote.userId === currentUser.id
  );

  const reOpenQuotes = async () => {
    try {
      await handleOpen();
      console.log("attempted to reOpen");
    } catch (error) {
      console.log(error);
    }
  };
  const handleInteraction = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quote: QuoteType,
    action: "like" | "unlike" | "delete"
  ) => {
    // console.log("Event target:", event.target); // Check what is being clicked
    // console.log("Event currentTarget:", event.currentTarget); // The element that has the event listener
    event.preventDefault();
    event.stopPropagation();

    // setLoading(true);
    try {
      switch (action) {
        case "like": {
          const likeResponse = await addLikedQuote(quote, currentUser.id);
          await addLikedQuote(quote, currentUser.id);
          dispatch(
            updateLikedQuotes({
              memeId: quote.memeId,
              quoteId: quote.id,
              likedQuote: likeResponse,
              action: "like",
            })
          );
          handleOpen();

          break;
        }
        case "unlike": {
          const likedQuote = quote.quoteLikes.find(
            (like) => like.userId === currentUser.id
          );
          if (likedQuote) {
            await deleteLikedQuote(likedQuote.id);
            dispatch(
              updateLikedQuotes({
                memeId: quote.memeId,
                quoteId: quote.id,
                likedQuote: likedQuote,
                action: "unlike",
              })
            );
            handleOpen();
          }
          break;
        }
        case "delete": {
          await deleteQuote(quote.id);
          dispatch(
            deleteQuoteRedux({ memeId: quote.memeId, quoteId: quote.id })
          );
          handleOpen();

          break;
        }
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
                  <IconButton
                    onClick={(event) =>
                      handleInteraction(event, quote, "delete")
                    }
                  >
                    <Delete />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={(event) =>
                      handleInteraction(
                        event,
                        quote,
                        quote.quoteLikes.some(
                          (like) => like.userId === currentUser.id
                        )
                          ? "unlike"
                          : "like"
                      )
                    }
                  >
                    {quote.quoteLikes.some(
                      (like) => like.userId === currentUser.id
                    ) ? (
                      <ThumbDown />
                    ) : (
                      <ThumbUp />
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
