import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { css, Global } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../database/users';
import { customTheme } from '../styles/customtheme';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');
    const profileResponseBody = await profileResponse.json();

    if ('errors' in profileResponseBody) {
      setUser(undefined);
    } else {
      setUser(profileResponseBody.user);
    }
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline enableColorScheme />
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
        `}
      />

      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
