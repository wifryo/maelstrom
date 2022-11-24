import { css } from '@emotion/react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Grid
            container
            item
            xs={4}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
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
          <Grid
            container
            item
            xs={4}
            justifyContent="flex-end"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
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
          <Grid
            container
            item
            xs={4}
            justifyContent="flex-end"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <div>
              <IconButton
                size="large"
                aria-label="login and registration"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="#000"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ mt: '2.5rem' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div>
                  {props.user ? (
                    <>
                      <Link href="/generators" underline="none">
                        <MenuItem onClick={handleClose}>generators</MenuItem>
                      </Link>
                      <Link href="/about" underline="none">
                        <MenuItem onClick={handleClose}>about</MenuItem>
                      </Link>
                      <Link href="/private-profile" underline="none">
                        <MenuItem onClick={handleClose}>profile</MenuItem>
                      </Link>
                      <Anchor href="/logout" css={anchorStyles}>
                        <MenuItem onClick={handleClose}>logout</MenuItem>
                      </Anchor>
                    </>
                  ) : (
                    <Link href="/login" underline="none">
                      <MenuItem onClick={handleClose}>login</MenuItem>
                    </Link>
                  )}
                </div>
              </Menu>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
