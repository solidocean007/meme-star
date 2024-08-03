import { Checkbox, Container, Grid, Button, useTheme, Theme } from "@mui/material";
import MemeCard from "./MemeCard";
import { applyChanges } from "../helperFunctions/applyChanges";
import { ChangeType, ProcessedMemeType } from "../Utils/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { useEffect, useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import {
  menuButtonStyle,
  portfolioCaptionStyle,
  portfolioCardMediaStyle,
  portfolioUserNameStyle,
} from "./Styles";

interface ProfileMemesProps {
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
}

const ProfileMemes = ({
  setPendingChanges,
}: ProfileMemesProps) => {
  const theme = useTheme<Theme>();

  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const allMemes = useSelector((state: RootState) => state.memes.entities);
  const dispatch = useAppDispatch();
  const [selectedMemes, setSelectedMemes] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profileMemes, setProfileMemes] = useState<ProcessedMemeType[]>([]);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }
    const userMemes = allMemes.filter(
      (meme) => meme.createdBy.id === loggedInUser?.id
    );
    setProfileMemes(userMemes);
  }, [allMemes, loggedInUser, selectedMemes]);

  const handleSelectMeme = (memeId: string) => {
    setSelectedMemes((prev) => {
      const newSelectedMemes = new Set(prev);
      if (newSelectedMemes.has(memeId)) {
        newSelectedMemes.delete(memeId);
      } else {
        newSelectedMemes.add(memeId);
      }
      return newSelectedMemes;
    });
  };

  const handleDeleteSelected = () => {
    setDialogOpen(true);
  };

  const removeMemeFromLocalState = (memeId: string) => {
    // take the profileMemes and filter out the meme from selectedMemes
    const filteredMemes = profileMemes.filter(
      (localMeme: ProcessedMemeType) => localMeme.id !== memeId
    );
    setProfileMemes(filteredMemes);
  };

  const handleConfirmDelete = async () => {
    try {
      const newChanges: ChangeType[] = [];

      for (const memeId of selectedMemes) {
        const newChange: ChangeType = {
          type: "deleteMeme",
          data: { memeId },
        };
        removeMemeFromLocalState(memeId);
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

      setSelectedMemes(new Set());
    } catch (error) {
      console.error("Error deleting selected memes:", error);
    } finally {
      setDialogOpen(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const messageQuestion =
    selectedMemes.size > 1
      ? `The selected ${selectedMemes.size} memes will be permanently deleted.`
      : "The selected meme will be permanently deleted.";

  return (
    <Container maxWidth={false} sx={{ background: theme.palette.background.paper, borderRadius: "5px"}}>
      <Button
      variant="contained"
        onClick={handleDeleteSelected}
        disabled={selectedMemes.size === 0}
        sx={menuButtonStyle}
      >
        Delete Selected
      </Button>
      <Grid container spacing={2} >
        {profileMemes.length === 0 && <h1>No Memes</h1>}
        {profileMemes.map((meme: ProcessedMemeType, index) => (
          <Grid
            container
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            spacing={1}
            key={index}
            alignItems="center"
            style={{ padding: "10px 0" }}
          >
            <Grid item xs={1}>
              <Checkbox
                checked={selectedMemes.has(meme.id)}
                onChange={() => handleSelectMeme(meme.id)}
              />
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={8} key={index}>
              <MemeCard
                meme={meme}
                loggedInUser={loggedInUser}
                cardMediaStyle={portfolioCardMediaStyle}
                captionStyle={portfolioCaptionStyle}
                userNameStyle={portfolioUserNameStyle}
              />
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

export default ProfileMemes;
