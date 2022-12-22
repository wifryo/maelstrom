import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getValidSessionByToken } from '../database/sessions';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tapestry</title>
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
        <Link href="/generators" underline="none">
          <Typography variant="h6">Tapestry</Typography>
        </Link>
        <Typography variant="body2">
          A curated collection of AI-powered text generators for use with
          tabletop RPGs.
        </Typography>
        <Typography variant="body2">
          Note: user accounts were wiped on 2022.12.10 due to ongoing
          development
        </Typography>

        <Box display="flex" mt="2rem">
          <Link href="/login" color="text.primary" mr="5px">
            <Typography variant="body2">Login</Typography>
          </Link>
          <Typography variant="body2">or</Typography>
          <Link href="/register" color="text.primary" ml="5px">
            <Typography variant="body2">register</Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/generators',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
