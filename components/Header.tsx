import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { User } from '../database/users';

type Props = {
  user?: User;
};

const anchorStyles = css`
  text-decoration: none;
  color: #000;
  font-size: 1.29rem;
`;

function Anchor({ children, ...restProps }: any) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: '4rem',
        pl: '3rem',
        pr: '3rem',
        boxShadow: 0,
        backgroundColor: '#F9E6C4',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderColor: '#000',
      }}
    >
      <Toolbar disableGutters={true}>
        <Grid container alignItems="center" height="3rem">
          <Grid container item xs={4}>
            <Link href="/generators" underline="none" mr="1rem">
              <Typography variant="body2">generators</Typography>
            </Link>
            <Link href="/about" underline="none" mr="1rem">
              <Typography variant="body2">about</Typography>
            </Link>
          </Grid>

          <Grid container item xs={4} justifyContent="center">
            <Link href="/" underline="none">
              <Typography variant="h6" fontSize="2rem">
                Tapestry
              </Typography>
            </Link>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            <Link href="/private-profile" underline="none" mr="1rem">
              <Typography variant="body2">
                {props.user && props.user.username}
              </Typography>
            </Link>

            {props.user ? (
              <Anchor href="/logout" css={anchorStyles}>
                logout
              </Anchor>
            ) : (
              <>
                <Link href="/login" underline="none" mr="1rem">
                  <Typography variant="body2">login</Typography>
                </Link>
                <Link href="/register" underline="none">
                  <Typography variant="body2">register</Typography>
                </Link>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
