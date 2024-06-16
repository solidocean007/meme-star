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
import { Delete, FavoriteBorder, Fingerprint, ThumbUp, ThumbUpAltOutlined } from "@mui/icons-material";
import { deleteQuote } from "../api/deleteQuote";
import { addLikedQuote } from "../api/addLikedQuote";
import { deleteLikedQuote } from "../api/deleteLikedQuote";
import { useAppDispatch } from "../Redux/hook";
import {
  updateLikedQuotes,
  deleteQuote as deleteQuoteRedux,
} from "../Redux/memeSlice";
import Favorite from "@mui/icons-material/Favorite";

interface MemeQuotesProps {
  quotes: QuoteType[] | undefined;
  setMemeQuotes: React.Dispatch<React.SetStateAction<any[]>>;
  currentUser: UsersType | null;
  handleOpen: () => void;
}

export const MemeQuotes = ({
  quotes,
  setMemeQuotes,
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
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
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
