import { Button, Checkbox, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { useEffect, useState } from "react";
import { ChangeType, QuoteType } from "../Utils/types";
import { deleteProfileQuotes } from "../api/deleteProfileQuotes";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { applyChanges } from "../helperFunctions/applyChanges";

interface QuoteWithImageType extends QuoteType {
  memeImageUrl: string;
}

interface ProfileQuotesProps {
  pendingChanges: ChangeType[];
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>
}

interface selectedQuoteType {
  quoteId: string;
  memeId: string;
}

const ProfileQuotes = ({ setPendingChanges }: ProfileQuotesProps) => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const allMemes = useSelector((state: RootState) => state.memes.entities);
  const dispatch = useAppDispatch();
  const [selectedQuotes, setSelectedQuotes] = useState<Set<selectedQuoteType>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileQuotes, setProfileQuotes] = useState<QuoteWithImageType[]>([]);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }

    const usersQuotes: QuoteWithImageType[] = allMemes.reduce((acc: QuoteWithImageType[], meme) => {
      const userQuotes = meme.allQuotes?.filter(quote => quote.userId === loggedInUser?.id) || [];
      return acc.concat(userQuotes.map(quote => ({ ...quote, memeImageUrl: meme.imageUrl, memeId: meme.id })));
    }, []);

    console.log(selectedQuotes);

    setProfileQuotes(usersQuotes);
  },[allMemes, loggedInUser, selectedQuotes])

  const handleSelectQuote = (quoteId: string, memeId: string) => {
    setSelectedQuotes((prev) => {
      const newSelectedQuotes = new Set(prev);
      const quote = { quoteId, memeId };
      if (Array.from(newSelectedQuotes).some(item => item.quoteId === quoteId)) {
        newSelectedQuotes.forEach(item => {
          if (item.quoteId === quoteId) {
            newSelectedQuotes.delete(item);
          }
        });
      } else {
        newSelectedQuotes.add(quote);
      }
      return newSelectedQuotes;
    });
  };

  const handleDeleteSelected = async () => {
    setDialogOpen(true);
  };

  const removeQuoteFromLocalState = (quoteId: string) => {
    const filteredQuotes = profileQuotes.filter(
      (localQuote: QuoteWithImageType) => localQuote.id !== quoteId
    );
    setProfileQuotes(filteredQuotes);
  };

  const handleConfirmDelete = async () => {
    try {
      const newChanges: ChangeType[] = [];

      for (const selectedQuote of selectedQuotes) {
        const newChange: ChangeType = {
          type: "deleteQuote",
          data: { memeId: selectedQuote.memeId, quoteId: selectedQuote.quoteId },
        };
        removeQuoteFromLocalState(selectedQuote.quoteId);
        newChanges.push(newChange);
      }

      setPendingChanges((prev) => {
        const updatedChanges = [...prev, ...newChanges];
        applyChanges({
          pendingChanges: updatedChanges,
          setPendingChanges,
          dispatch,
        });
        return updatedChanges;
      });

      setSelectedQuotes(new Set());
    } catch (error) {
      console.error("Error deleting selected quotes:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const quoteImageStyle = {
    width: 100,
  };

  const messageQuestion = selectedQuotes.size > 1 ? `The ${selectedQuotes.size} selected quotes will be permanently deleted` : "The selected quote will be permanently deleted."

  return (
    <Container  maxWidth={false} sx={{ background: "green"}}>
      <Button onClick={handleDeleteSelected} disabled={selectedQuotes.size === 0}>
        Delete Selected
      </Button>
      <Grid container spacing={2}>
        {profileQuotes.map((quote: QuoteWithImageType, index) => (
          <Grid container item xs={12} spacing={1} key={index} alignItems="center" style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
            <Grid item xs={1}>
            <Checkbox
                checked={Array.from(selectedQuotes).some(item => item.quoteId === quote.id)}
                onChange={() => handleSelectQuote(quote.id, quote.memeId)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>"{quote.text}"</Typography>
            </Grid>
            <Grid item xs={4}>
              {quote.memeImageUrl && <img src={quote.memeImageUrl} alt="Meme" style={quoteImageStyle} />}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <DeleteConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        messageQuestion={messageQuestion}
      />
    </Container>
  );
};

export default ProfileQuotes;
