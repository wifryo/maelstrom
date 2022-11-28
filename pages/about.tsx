import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TollIcon from '@mui/icons-material/Toll';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { SavedBackstoryContent } from '../database/backstories';
import { FullSavedName } from '../database/names';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
};

export default function About() {
  return (
    <div>
      <Head>
        <title>Tapestry: about</title>
        <meta name="description" content="about" />
      </Head>
      <Box
        display="flex"
        sx={{ width: { xs: '100%', sm: '60%', lg: '50%' } }}
        flexDirection="column"
        justifyContent="center"
        m="auto"
        mt="2rem"
      >
        <Typography variant="h1">About</Typography>
        <Typography mt="1rem">
          Tapestry is a student project made during an{' '}
          <Link href="https://upleveled.io/">Upleveled</Link> bootcamp by
          William Young. Check out my latest projects on{' '}
          <Link href="http://github.com/wifryo">Github</Link>.
        </Typography>
        <br />
        <Typography>
          This project is designed primarily to work with{' '}
          <Link href="https://dnd.wizards.com/">Dungeons & Dragons</Link> 5th
          edition, a tabletop role-playing game.
        </Typography>
        <br />
        <Typography>
          Find out more about the{' '}
          <Link href="https://www.dndbeyond.com/classes">classes</Link> and{' '}
          <Link href="https://www.dndbeyond.com/races">origins</Link> referenced
          in the generators.
        </Typography>
      </Box>
    </div>
  );
}
