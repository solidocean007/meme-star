// HomePage.tsx
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MemeFeed from "./MemeFeed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { LogoutSharp } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { loginUser, logout } from "../Redux/authSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleGoToLoginSignUp = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  };

  function handleLogout(){
    dispatch(logout());
    navigate('/signup');
  }

  useEffect(()=> {
    const userInLocalStorage = localStorage.getItem('user')
    if (userInLocalStorage){
      dispatch(loginUser(userInLocalStorage));
    }
  },)

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MemeStar
          </Typography>
          <IconButton color="inherit" onClick={handleGoToLoginSignUp}>
            <AccountCircle />
          </IconButton>
          {isAuthenticated && (
            <Typography variant="h6" component="div">
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
        maxWidth="xl"
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to MemeStar
        </Typography>

        <MemeFeed />

        {!isAuthenticated && (
          <Box mt={2} width="100%">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => console.log("Go to Sign Up/Login")}
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
