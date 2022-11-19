import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="tapestry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        component="div"
        display="flex"
        flexDirection="column"
        position="absolute"
        height="100%"
        width="100%"
        ml="-3rem"
        mr="-3rem"
        mt="-8rem"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">
          <Link href="/generators" underline="none" color="text.primary">
            Tapestry
          </Link>
        </Typography>
        <Typography variant="body2">
          A curated collection of text generators for use with tabletop RPGs.
        </Typography>
      </Box>
    </>
  );
}
