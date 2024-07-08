import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  Modal,
  Card,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MemeFeed from "./MemeFeed";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux/store";
import { LogoutSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { logout } from "../Redux/authSlice";
import LeaderBoard from "../helperFunctions/LeaderBoard";

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
      navigate("/signup");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <AppBar
        position="static"
        style={{ background: "var(--dusty-cactus)", color: "black" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            MemeStar
          </Typography>
          <IconButton color="inherit" onClick={handleGoToLoginSignUp}>
            <AccountCircle />
          </IconButton>
          {isAuthenticated && (
            <Typography variant="h5" component="div">
              {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
            </Typography>
          )}
          {isAuthenticated && (
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutSharp />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Container
        maxWidth={false}
        sx={{
          my: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%", // Ensure full width
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Box display={{ xs: "block", md: "none" }} mt={2}>
            <Button variant="contained" onClick={handleOpen}>
              Show Leaderboard
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Card sx={{bgcolor: "white"}}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    // bgcolor: "background.paper",
                    // border: "2px solid #000",
                    // boxShadow: 24,
                    // p: 4,
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
          <Grid item xs={2} md={6}>
            <MemeFeed />
          </Grid>
          <Grid item xs={12} md={3} display={{ xs: "none", md: "block" }}>
            <LeaderBoard />
          </Grid>
        </Grid>

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
      </Container>

      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 3,
          mt: 4,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body1">Your daily dose of fun</Typography>
          <Typography variant="caption">© 2024 MemeStar</Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
