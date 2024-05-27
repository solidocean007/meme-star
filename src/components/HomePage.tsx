import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // If you need a menu button
import AccountCircle from '@mui/icons-material/AccountCircle';
import MemeFeed from './MemeFeed';

const HomePage = () => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MemeStar
          </Typography>
          <IconButton color="inherit" onClick={() => console.log('Log Out')}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to MemeStar
        </Typography>
        
        <MemeFeed />

        <Box mt={2} width="100%">
          <Button variant="contained" color="secondary" fullWidth onClick={() => console.log('Go to Sign Up/Login')}>
            Sign Up / Log In
          </Button>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="body1">
            Your daily dose of fun
          </Typography>
          <Typography variant="caption">
            © 2024 MemeStar
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
