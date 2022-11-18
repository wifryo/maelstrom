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
      default: '#ffffff',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "'Libertinage', 'Ubuntu', 'sans-serif'",
    fontSize: 16,
    h1: {
      fontFamily: "'Chaucer', 'Ubuntu', 'sans-serif'",
      fontSize: '5rem',
    },
    h2: {
      fontFamily: "'Libertinage', 'Ubuntu', 'sans-serif'",
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontFamily: "'Libertinage', 'Ubuntu', 'sans-serif'",
      fontSize: '1rem',
    },
    h4: undefined,
    h5: undefined,
    h6: {
      fontFamily: "'Libertinage', 'Ubuntu', 'sans-serif'",
      fontSize: '1rem',
    },

    button: {
      fontFamily: "'Roboto', 'Ubuntu', 'sans-serif'",
      fontSize: '1rem',
      lineHeight: 1,
    },
  },
});
