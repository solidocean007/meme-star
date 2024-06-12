import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { loginUser, signUpUser } from "../Redux/authSlice";
import { useAppDispatch } from "../Redux/hook";
import { NewUserType, UsersType } from "../Utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { useNavigate } from "react-router";

const LoginSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPasswordInput, setVerifyPasswordInput] = useState("");
  const [validatedInputs, setValidatedInputs] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(password)
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const setUserToLocalStorage = (user: UsersType | null) => {
    localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }

  const handleLogIn = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
    setUserToLocalStorage(user);
  };

  const validateUserInputs = () => {
    const inputsNotEmpty = [firstName, lastName, email, password, verifyPasswordInput].every(field => field !== '');
    setValidatedInputs(inputsNotEmpty);
  }

  const checkIfPasswordsMatch = (firstPassword: string, secondPassword: string) => {
    setPasswordsMatch(firstPassword === secondPassword);
  };

  const handleSignUp = () => {
    validateUserInputs()
    checkIfPasswordsMatch(password, verifyPasswordInput);

    if(validatedInputs && passwordsMatch){
      const newUserData: NewUserType = {
        firstName,
        lastName,
        email,
        password,
        verifyPasswordInput,
      };
      dispatch(signUpUser(newUserData));
    } else {
      alert("Please ensure all fields are filled out and passwords match.")
    }
  };

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isLogin) {
      handleLogIn(email, password);
    } else {
      handleSignUp();
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to meme feed if user is logged in
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="primary">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: 1 }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
      </AppBar>
      <Box component="form" onSubmit={submitLogin} noValidate sx={{ mt: 1 }}>
        {!isLogin && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="verifyPassword"
          label="Password"
          type="password"
          id="verifyPassword"
          autoComplete="current-password"
          value={verifyPasswordInput}
          onChange={(e) => setVerifyPasswordInput(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={handleToggle}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin
            ? "Need an account? Sign Up Here"
            : "Already have an account? Login Here"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginSignUp;
