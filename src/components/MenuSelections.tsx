import { Box, Button, Theme, Typography } from "@mui/material";

export const MenuSelections = ({
  theme,
  showProfile,
  handleCreateMeme,
  handleOpenLeaderBoard,
  handleShowProfile,
  handleOpenHowToPlay,
}: {
  theme: Theme;
  showProfile: boolean;
  handleCreateMeme: () => void;
  handleOpenLeaderBoard: () => void;
  handleShowProfile: () => void;
  handleOpenHowToPlay: () => void;
}) => {
  const menuButtonStyle = {

  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", lg: "column" },
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <Box sx={{ pb: { sx: 1, md: 2, lg: 3, xl: 4 } }}>
        <Button variant="contained" color="info" onClick={handleCreateMeme}>
          <Typography
            variant="h3"
            sx={menuButtonStyle}
            color={theme.palette.text.primary}
          >
            Create Meme
          </Typography>
        </Button>
      </Box>

      <Box display={{ sm: "block", lg: "none" }}>
        <Button
          variant="contained"
          color="info"
          onClick={handleOpenLeaderBoard}
        >
          <Typography
            variant="h3"
            sx={menuButtonStyle}
            color={theme.palette.text.primary}
          >
            Show LeaderBoard
          </Typography>
        </Button>
      </Box>
      <Box>
        <Button variant="contained" color="info" onClick={handleShowProfile}>
          <Typography
            variant="h3"
            sx={menuButtonStyle}
            color={theme.palette.text.primary}
          >
            {!showProfile ? "Profile" : "Close Profile"}
          </Typography>
        </Button>
      </Box>
      <Box>
        <Button variant="contained" color="info" onClick={handleOpenHowToPlay}>
          <Typography
            variant="h3"
            sx={menuButtonStyle}
            color={theme.palette.text.primary}
          >
            How to Play
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
