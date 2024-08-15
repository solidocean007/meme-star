import { createTheme, PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#005EA6',
  },
  secondary: {
    main: '#F6D7A8',
  },
  background: {
    default: '#DEE2E6',
    paper: '#95A5A6',
  },
  text: {
    // primary: '#2C2C2C',
    primary: '#FFFFFF',
    secondary: 'black',
  },
  action: {
    active: '#005EA6',
    hover: '#78ACFD',
    selected: '#F6D7A8',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#bb86fc',
  },
  secondary: {
    main: '#03dac6',
  },
  background: {
    default: '#121212',
    paper: '#424552',
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.54)',
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