import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../database/users';

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
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          @font-face {
            font-family: 'Ubuntu-Bold';
            src: url('../fonts/Ubuntu/Ubuntu-Bold.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-BoldItalic';
            src: url('../fonts/Ubuntu/Ubuntu-BoldItalic.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-Italic';
            src: url('../fonts/Ubuntu/Ubuntu-Italic.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-Light';
            src: url('../fonts/Ubuntu/Ubuntu-Light.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-LightItalic';
            src: url('../fonts/Ubuntu/Ubuntu-LightItalic.ttf')
              format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-Medium';
            src: url('../fonts/Ubuntu/Ubuntu-Medium.ttf') format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-MediumItalic';
            src: url('../fonts/Ubuntu/Ubuntu-MediumItalic.ttf')
              format('truetype');
          }
          @font-face {
            font-family: 'Ubuntu-Regular';
            src: url('../fonts/Ubuntu/Ubuntu-Regular.ttf') format('truetype');
          }

          body {
            height: 100vh;
            background-color: #25201d;
            color: #faf9f7;
            font-family: 'Ubuntu-Regular', sans-serif;
            font-size: 16px;
            margin: 0;
          }

          h1 {
            font-size: 2.25rem;
            margin: 0.75rem 0 0 0;
            font-family: 'Ubuntu-Bold', sans-serif;
            color: #faf9f7;
          }

          h2 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0 0;
            font-family: 'Ubuntu-Italic', sans-serif;
            color: #faf9f7;
          }
        `}
      />
      <Layout user={user}>
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}

export default MyApp;
