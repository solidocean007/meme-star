import { createTheme, PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1976d2',
  },
  secondary: {
    main: '#dc004e',
  },
  background: {
    default: '#e9d8d8',
    paper: '#ffffff',
  },
  text: {
    primary: '#333333',
    secondary: 'rgba(0, 0, 0, 0.54)',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#bb86fc', // Primary purple color
  },
  secondary: {
    main: '#03dac6', // Secondary color (assuming cyan from the image)
  },
  background: {
    default: '#121212', // Dark background color
    paper: '#282828', // Lighter dark background for paper elements
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)', // Light text for dark theme
    secondary: 'rgba(255, 255, 255, 0.54)', // Lighter text for secondary text
  },
};

const typography = {
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  spacing: 8,
});

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  spacing: 8,
});


