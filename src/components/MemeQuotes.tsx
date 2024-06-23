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
import {
  ChangeType,
  LikedQuotesType,
  QuoteType,
  UsersType,
} from "../Utils/types";
import { Delete, FavoriteBorder } from "@mui/icons-material";
import Favorite from "@mui/icons-material/Favorite";

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
    // this function returns boolean if its the users quote.  seems redundant after the previous userAlreadyQuoted variable
    return quote.userId === currentUser.id;
  };

  const findAnyPendingChangeForQuote = (quote: QuoteType) => {
    return pendingChanges.find((change) => {
      // Depending on the change type, check if this is the change related to the given quote
      if (change.type === "addLikedQuote") {
        return change.data.quoteId === quote.id;  // returns true if this is the matching addLikedQuote change
      } else if (change.type === "deleteLikedQuote") {
        return change.data.likedQuoteId === quote.id;  // returns true if this is the matching deleteLikedQuote change
      }
      return false;  // return false if neither condition is met, ensuring no irrelevant change is returned
    });
  }
  

  const removePendingChange = (pendingChange: ChangeType) => {
    return pendingChanges.filter((change) => {
      return change.type === "addLikedQuote"
        ? change.data.quoteId !==
            (pendingChange.data as LikedQuotesType).quoteId
        : change.type === "deleteLikedQuote"
        ? change.data.likedQuoteId !==
          (pendingChange.data as { likedQuoteId: string }).likedQuoteId
        : true;
    });
  };

  const userLikesQuote = (quote: QuoteType) => {
    return quote.quoteLikes.find(
      (likedQuote) => likedQuote.userId === currentUser.id
    );
  };

  const createNewChange = (quote: QuoteType) => {
    const usersLikedQuoteObj = userLikesQuote(quote);
    // create a newChange of type removeLike and set it to pending changes
    if (!usersLikedQuoteObj && currentUser.id && quote.id) {
      return {
        // define a newChange that is of the type of adding a likedQuote object
        type: "addLikedQuote", // add type of action.  may not be necessary anymore
        data: {
          // define the newLikedObject with its necessary props minus id which is created on fetch PUT
          userId: currentUser.id,
          quoteId: quote.id,
          memeId: memeId,
        },
      };
    } else if (usersLikedQuoteObj && usersLikedQuoteObj.id) {
      // if the user likes this quote create a change to delete it
      return {
        type: "deleteLikedQuote",
        data: {
          likedQuoteId: usersLikedQuoteObj.id,
        },
      };
    }
    return null;
  };

  // Ensure that the newChange.data matches the LikedQuotesType structure exactly
// const toggleFavoriteQuote = (targetQuote: QuoteType) => {
//   if (!currentUser.id) return;

//   const alreadyLiked = userLikesQuote(targetQuote);
//   let newChange: ChangeType | null = null;

//   if (!alreadyLiked && targetQuote.id) {
//     // Ensure that this object exactly matches the LikedQuotesType
//     newChange = {
//       type: "addLikedQuote",
//       data: {
//         userId: currentUser.id,
//         quoteId: targetQuote.id,
//         memeId: memeId,
//         id: undefined // Temporarily undefined, will be set by server on actual creation
//       }
//     };
//   } else if (alreadyLiked?.id) {
//     // Assuming alreadyLiked is of type LikedQuotesType and has an id
//     newChange = {
//       type: "deleteLikedQuote",
//       data: { likedQuoteId: alreadyLiked.id }
//     };
//   }

//   const existingChange = findAnyPendingChangeForQuote(targetQuote);

//   if (existingChange) {
//     const updatedChanges = pendingChanges.filter(change => change !== existingChange);
//     setPendingChanges(updatedChanges);
//   } else if (newChange) {
//     setPendingChanges(prev => [...prev, newChange]);
//   }

//   // Update local quotes optimistically
//   setLocalQuotes(localQuotes.map(quote => {
//     if (quote.id === targetQuote.id && alreadyLiked?.id) {
//       const updatedQuoteLikes = newChange?.type === "addLikedQuote" ? 
//         [...quote.quoteLikes, newChange.data as LikedQuotesType] :
//         quote.quoteLikes.filter(like => like.id !== alreadyLiked.id);
      
//       return { ...quote, quoteLikes: updatedQuoteLikes };
//     }
//     return quote;
//   }));
// };

const toggleFavoriteQuote = (targetQuote: QuoteType) => {
  if (!currentUser.id) return;

  const alreadyLiked = userLikesQuote(targetQuote);
  let newChange: ChangeType | null = null;

  if (!alreadyLiked && targetQuote.id) {
    newChange = {
      type: "addLikedQuote",
      data: {
        userId: currentUser.id,
        quoteId: targetQuote.id,
        memeId: memeId,
        id: undefined // The id will be set by the server upon actual creation
      }
    };
  } else if (alreadyLiked?.id) {
    newChange = {
      type: "deleteLikedQuote",
      data: { likedQuoteId: alreadyLiked.id }
    };
  }

  const existingChange = findAnyPendingChangeForQuote(targetQuote);

  if (existingChange) {
    const updatedChanges = pendingChanges.filter(change => change !== existingChange);
    setPendingChanges(updatedChanges);
  } else if (newChange) {
    setPendingChanges(prev => [...prev, newChange]);
  }

  // Update local quotes optimistically
  setLocalQuotes(localQuotes.map(quote => {
    if (quote.id === targetQuote.id) {
      const updatedQuoteLikes = newChange?.type === "addLikedQuote" ? 
        [...quote.quoteLikes, {...newChange.data, id: undefined}] : // Add a temporary placeholder for new likes
        quote.quoteLikes.filter(like => like.id !== alreadyLiked?.id); // Remove the like if it exists
      
      return { ...quote, quoteLikes: updatedQuoteLikes };
    }
    return quote;
  }));
};


  
  const handleSubmitNewQuote = (memeId: string) => {
    if (newQuoteText) {
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
      setNewQuoteText("");
    }
  };

  return (
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
                  currentUser && toggleFavoriteQuote(quote);
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
                    toggleFavoriteQuote(quote);
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
  );
};
