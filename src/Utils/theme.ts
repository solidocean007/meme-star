import { createTheme, PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#005EA6', // Blue
  },
  secondary: {
    main: '#F6D7A8', // Light Orange
  },
  background: {
    default: '#DEE2E6',
    paper: '#95A5A6',
  },
  text: {
    // primary: '#2C2C2C', // Dark grey for primary text
    primary: '#FFFFFF', // Dark grey for primary text
    secondary: '#6C757D', // Lighter grey for secondary text
  },
  action: {
    active: '#005EA6', // Blue
    hover: '#78ACFD', // Light Blue
    selected: '#F6D7A8', // Light Orange
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
  h4: {
    fontSize: '1rem',
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