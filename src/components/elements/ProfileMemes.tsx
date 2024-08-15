import {
  Checkbox,
  Container,
  Button,
  useTheme,
  Theme,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import MemeCard from "./MemeCard";
import { applyChangesToMemes } from "../../helperFunctions/applyChangesToMemes";
import { ChangeType, ProcessedMemeType } from "../../Utils/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useEffect, useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import {
  menuButtonStyle,
  portfolioCaptionStyle,
  portfolioCardMediaStyle,
  portfolioUserNameStyle,
} from "../../styles/Styles";

interface ProfileMemesProps {
  setPendingChanges: React.Dispatch<React.SetStateAction<ChangeType[]>>;
}

const ProfileMemes = ({ setPendingChanges }: ProfileMemesProps) => {
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
        applyChangesToMemes({
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
    <Container
      maxWidth={false}
      sx={{
        background: theme.palette.background.paper,
        borderRadius: "5px",
        padding: "30px",
      }}
    >
      <Button
        variant="contained"
        onClick={handleDeleteSelected}
        disabled={selectedMemes.size === 0}
        sx={menuButtonStyle}
      >
        Delete Selected
      </Button>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {profileMemes.length === 0 && (
          <Typography variant="h6">No Memes</Typography>
        )}
        {profileMemes.map((meme: ProcessedMemeType, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: { xs: "70%", xl: "45%" },
              margin: "10px",
            }}
          >
            <MemeCard
              meme={meme}
              loggedInUser={loggedInUser}
              cardMediaStyle={portfolioCardMediaStyle}
              captionStyle={portfolioCaptionStyle}
              userNameStyle={portfolioUserNameStyle}
            />
            <Checkbox
              sx={{
                position: "absolute",
                top: "10px",
                left: "10px",
                color: "white",
              }}
              checked={selectedMemes.has(meme.id)}
              onChange={() => handleSelectMeme(meme.id)}
            />
          </Box>
        ))}
      </div>
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
