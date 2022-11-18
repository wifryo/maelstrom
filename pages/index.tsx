import { css } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';

const bodyStyles = css`
  margin: 0px, 20px, 0px, 20px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: none;

  > a {
    text-decoration: none;
    color: black;
  }
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="tapestry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <Typography variant="h1" css={bodyStyles}>
        <Link href="/generators">Tapestry</Link>
      </Typography>
    </div>
  );
}
