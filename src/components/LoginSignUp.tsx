import React, { useState } from 'react';
import { AppBar, Container, Typography, TextField, Button, Box, Grid, Alert } from '@mui/material';
import { loginUser, signUpUser } from '../Redux/authSlice';
import { useAppDispatch } from '../Redux/hook';
import { NewUserType } from '../Utils/types';

const LoginSignUp = () => {
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and signup
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogIn = (email: string, password: string) => {
    dispatch(loginUser({email, password}));
  }

  const handleSignUp = () => {
    const newUserData: NewUserType = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signUpUser(newUserData));
  }
  
  const submitLogin = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isLogin) {
      handleLogIn(email, password);
    } else {
      handleSignUp();
    }
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static" color="primary">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 1 }}>
          {isLogin ? 'Login' : 'Sign Up'}
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
                onChange={e => setFirstName(e.target.value)}
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
                onChange={e => setLastName(e.target.value)}
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
          onChange={e => setEmail(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={handleToggle}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </Button>
      </Box>
    </Container>
  );
}

export default LoginSignUp;
