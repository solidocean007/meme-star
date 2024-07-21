import { useState } from "react";
import { Container, Button, Box, Grid, Modal, Card } from "@mui/material";
import MemeFeed from "../MemeFeed";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";
import LeaderBoard from "../LeaderBoard";
import PageLayout from "./PageLayout";
import SideBarLayout from "./SideBarLayout";
import HowToPlay from "../HowToPlay";

const HomePage = () => {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [openHowToPlay, setOpenHowToPlay] = useState(false);

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/signUp");
    }
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

  const homePageStyle = {
    my: 1,
    width: "100%",
    height: "100%",
  };

  return (
    <Container sx={{ margin: "0", padding: "0", height: "100%" }}>
      <PageLayout
        isAuthenticated={isAuthenticated}
        loggedInUser={loggedInUser}
        handleGoToLoginSignUp={handleGoToLoginSignUp}
      >
        <Container sx={homePageStyle}>
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
          <Grid
            container
            spacing={1}
            m={0}
            p={0}
            sx={{ height: "100%" }}
          >
            <Grid item xs={12} md={3}>
              <SideBarLayout>
                <Button
                  variant={undefined}
                  color="info"
                  onClick={handleCreateMeme}
                >
                  Create Meme
                </Button>
                <Box display={{ xs: "block", sm: "block", md: "none" }}>
                  <Button variant={undefined} color="info" onClick={handleOpenLeaderBoard}>
                    Show LeaderBoard
                  </Button>
                </Box>
                <Box>
                  <Button variant={undefined} color="info" onClick={handleOpenHowToPlay}>
                    How to Play
                  </Button>
                </Box>
              </SideBarLayout>
            </Grid>

            <Grid item xs={12} md={6}>
              <MemeFeed />
            </Grid>
            <Grid item xs={12} md={3} display={{ xs: "none", md: "block" }}>
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
            <HowToPlay />
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

