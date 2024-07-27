// homepage.tsx
import { useState } from "react";
import {
  Container,
  Button,
  Box,
  Grid,
  Modal,
  Card,
  useMediaQuery,
  Typography,
  Theme,
} from "@mui/material";
import MemeFeed from "../MemeFeed";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
import LeaderBoard from "../LeaderBoard";
import PageLayout from "./PageLayout";
import SideBarLayout from "./SideBarLayout";
import HowToPlay from "../HowToPlay";
import MemeFeedDesktop from "../MemeFeedDesktop";
import { homePageStyle, sideBarButtonStyle } from "../Styles";
import UsersProfile from "./UserProfile";

const HomePage = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [openHowToPlay, setOpenHowToPlay] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/login-sign-up");
    }
  };

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleOpenHowToPlay = () => {
    setOpenHowToPlay(true);
  };

  const handleCloseHowToPlay = () => {
    setOpenHowToPlay(false);
  };

  const handleCreateMeme = () => {
    navigate("/create-meme-page");
  };

  const handleOpenLeaderBoard = () => setOpenLeaderBoard(true);

  const handleCloseLeaderBoard = () => setOpenLeaderBoard(false);

  const isTabletOrLarger = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );

  return (
    <Container
      maxWidth={false}
      sx={{ margin: "0", padding: "0", height: "100%" }}
    >
      <PageLayout
        isAuthenticated={isAuthenticated}
        loggedInUser={loggedInUser}
        handleGoToLoginSignUp={handleGoToLoginSignUp}
      >
        <Container maxWidth={false} sx={homePageStyle}>
          {!isAuthenticated && (
            <Box m={2} width="100%">
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleGoToLoginSignUp}
              >
                Sign Up / Log In
              </Button>
            </Box>
          )}
          <Grid container spacing={1} m={0} p={0} sx={{ height: "100%" }}>
            <Grid item xs={12} md={1} p={0}>
              <SideBarLayout>
                <Button
                  variant={undefined}
                  color="info"
                  onClick={handleCreateMeme}
                >
                  <Typography variant="h3" sx={sideBarButtonStyle}>
                    Create Meme
                  </Typography>
                </Button>
                <Box display={{ xs: "block", sm: "block", md: "none" }}>
                  <Button
                    variant={undefined}
                    color="info"
                    onClick={handleOpenLeaderBoard}
                  >
                    <Typography variant="h3" sx={sideBarButtonStyle}>
                      Show LeaderBoard
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant={undefined}
                    color="info"
                    onClick={handleShowProfile}
                  >
                    <Typography variant="h3" sx={sideBarButtonStyle}>
                      {!showProfile ? "Profile" : "Close Profile"}
                    </Typography>
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant={undefined}
                    color="info"
                    onClick={handleOpenHowToPlay}
                  >
                    <Typography variant="h3" sx={sideBarButtonStyle}>
                      How to Play
                    </Typography>
                  </Button>
                </Box>
              </SideBarLayout>
            </Grid>

            <Grid item xs={12} md={9}>
              {showProfile ? (
                <UsersProfile />
              ) : isTabletOrLarger ? (
                <MemeFeedDesktop />
              ) : (
                <MemeFeed />
              )}
            </Grid>
            <Grid item xs={12} md={2} display={{ xs: "none", md: "block" }}>
              <SideBarLayout>
                <LeaderBoard />
              </SideBarLayout>
            </Grid>
          </Grid>
        </Container>
      </PageLayout>

      <Modal open={openHowToPlay} onClose={handleCloseHowToPlay}>
        <Card sx={{ bgcolor: "white" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "75%", md: "50%", lg: "25%" },
              p: 2,
            }}
          >
            <HowToPlay open={openHowToPlay} onClose={handleCloseHowToPlay} />
            <Button onClick={handleCloseHowToPlay} fullWidth>
              Close
            </Button>
          </Box>
        </Card>
      </Modal>
      <Modal open={openLeaderBoard} onClose={handleCloseLeaderBoard}>
        <Card sx={{ bgcolor: "white" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "75%", md: "50%", lg: "25%" },
              p: 2,
            }}
          >
            <LeaderBoard />
            <Button onClick={handleCloseLeaderBoard} fullWidth>
              Close
            </Button>
          </Box>
        </Card>
      </Modal>
    </Container>
  );
};

export default HomePage;
