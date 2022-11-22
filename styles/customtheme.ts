import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#2F4858',
    },
    secondary: {
      main: '#8CAA94',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#000',
    },
    background: {
      default: '#F9E6C4',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
    fontSize: 16,
    h1: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '3rem',
    },
    h2: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '1rem',
    },
    h4: undefined,
    h6: {
      fontFamily: "'Chaucer', 'Libertinage', 'sans-serif'",
      fontSize: '5rem',
      color: '#000',
    },

    button: {
      fontFamily: "'Roboto', 'Libertinage', 'sans-serif'",
      fontSize: '1rem',
      lineHeight: 1,
    },
    body2: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '1.3rem',
      color: '#000',
    },
    h5: {
      fontFamily: "'Roboto', 'Libertinage', 'sans-serif'",
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
});
