import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { height } from '@mui/system';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="tapestry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{ height: '100%' }}
        component="div"
        display="flex"
        justifyContent="center"
      >
        <Typography variant="h1">
          <Link href="/generators">Tapestry</Link>
        </Typography>
        <Typography></Typography>
      </Box>
    </>
  );
}
