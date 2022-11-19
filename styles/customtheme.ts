import { blueGrey, grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#c4e0a4',
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
    fontFamily: "'Roboto', 'Libertinage', 'sans-serif'",
    fontSize: 16,
    h1: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '3rem',
    },
    h2: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '1.5rem',
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
    },

    button: {
      fontFamily: "'Roboto', 'Libertinage', 'sans-serif'",
      fontSize: '1rem',
      lineHeight: 1,
    },
    body2: {
      fontFamily: "'Libertinage', 'Roboto', 'sans-serif'",
      fontSize: '1.3rem',
    },
    h5: {
      fontFamily: "'Roboto', 'Libertinage', 'sans-serif'",
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
});
