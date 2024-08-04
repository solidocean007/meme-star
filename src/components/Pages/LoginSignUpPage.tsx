import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  useTheme,
  Theme,
} from "@mui/material";
import { loginUser, signUpUser } from "../../Redux/authSlice";
import { NewUserType, UsersType } from "../../Utils/types";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginSignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme<Theme>();

  useEffect(() => {
    if (user) {
      setUserToLocalStorage(user);
      navigate("/");
    }
  }, [user, navigate]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const clearForm = () => {
    setFormState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: "",
    });
  };

  const handleToggle = () => {
    clearForm();
    setIsLogin(!isLogin);
  };

  const setUserToLocalStorage = (user: UsersType | null) => {
    localStorage.setItem("userLoggedIn", JSON.stringify(user));
  };

  const handleLogIn = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const handleSignUp = () => {
    const inputsNotEmpty = Object.values(formState).every(
      (field) => field !== ""
    );
    const passwordsMatch = formState.password === formState.verifyPassword;

    if (inputsNotEmpty && passwordsMatch) {
      const newUserData: NewUserType = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      };
      dispatch(signUpUser(newUserData));
    } else {
      alert("Please ensure all fields are filled out and passwords match.");
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
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const inputStyles = {
    style: { color: theme.palette.text.secondary },
  };

  return (
    <div className="login-signup-page">
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
                  InputProps={inputStyles}
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
                  InputProps={inputStyles}
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
            InputProps={inputStyles}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            InputProps={{
              style: { color: theme.palette.text.secondary },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="verifyPassword"
              label="Verify Password"
              type={showPassword ? "text" : "password"}
              id="verifyPassword"
              autoComplete="current-password"
              value={formState.verifyPassword}
              onChange={handleChange}
              InputProps={{
                style: { color: theme.palette.text.secondary },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
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
            sx={{ mt: 3, mb: 2, color: theme.palette.text.secondary }}
          >
            {isLogin
              ? "Need an account? Sign Up Here"
              : "Already have an account? Login Here"}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginSignUp;
