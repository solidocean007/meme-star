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
  const [isLogin, setIsLogin] = useState(true);

  const [formState, setFormState ] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const [errors, setErrors] = useState({
    validatedInputs: true,
    passwordsMatch: true,
  });

  const user = useSelector((state: RootState) => state.auth.user);

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
    const inputsNotEmpty = Object.values(formState).every(field => field !== '');
    setErrors(prevState => ({ ...prevState, validatedInputs: inputsNotEmpty }));
  };

  const checkIfPasswordsMatch = () => {
    const passwordsMatch = formState.password === formState.verifyPassword;
    setErrors(prevState => ({ ...prevState, passwordsMatch }));
  };

  const handleSignUp = () => {
    validateUserInputs()
    checkIfPasswordsMatch();

    if(errors.validatedInputs && errors.passwordsMatch){
      const newUserData: NewUserType = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
        verifyPasswordInput: formState.verifyPassword
      };
      dispatch(signUpUser(newUserData));
    } else {
      alert("Please ensure all fields are filled out and passwords match.")
    }
  };

  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isLogin) {
      handleLogIn(formState.email, formState.password);
    } else {
      handleSignUp();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
                value={formState.firstName}
                onChange={handleChange}
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
                value={formState.lastName}
                onChange={handleChange}
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
          value={formState.email}
          onChange={handleChange}
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
          value={formState.password}
          onChange={handleChange}
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
          value={formState.verifyPassword}
          onChange={handleChange}
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
