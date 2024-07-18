import { useState } from "react";
import { Container, Button, Box, Grid, Modal, Card } from "@mui/material";
import MemeFeed from "../MemeFeed";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router";
import { logout } from "../../Redux/authSlice";
import LeaderBoard from "../../helperFunctions/LeaderBoard";
import PageLayout from "./PageLayout";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/signUp");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleCreateMeme() {
    navigate("/create-meme-page");
  }

  const homePageStyle = {
    my: 4,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  };

  return (
    <>
      <PageLayout
        isAuthenticated={isAuthenticated}
        loggedInUser={loggedInUser}
        handleGoToLoginSignUp={handleGoToLoginSignUp}
        handleLogout={handleLogout}
      >
        <Container sx={homePageStyle}>
          <Grid container spacing={2} justifyContent="center">
            <Box display={{ xs: "block", md: "none" }} sx={{display: "flex", justifyContent: "space-around", width: "100%" }} mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCreateMeme}
              >
                Create Meme
              </Button>
              <Button variant="contained" onClick={handleOpen}>
                Show LeaderBoard
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Card sx={{ bgcolor: "white" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 300,
                    }}
                  >
                    <LeaderBoard />
                    <Button onClick={handleClose} fullWidth>
                      Close
                    </Button>
                  </Box>
                </Card>
              </Modal>
            </Box>
            <Grid item xs={12} md={6}>
              <MemeFeed />
            </Grid>
            <Grid item xs={12} md={3} display={{ xs: "none", md: "block" }}>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreateMeme}
                >
                  Create Meme
                </Button>
              </Box>
              <LeaderBoard />
            </Grid>
          </Grid>
        </Container>

        {!isAuthenticated && (
          <Box mt={2} width="100%">
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
      </PageLayout>
    </>
  );
};

export default HomePage;
