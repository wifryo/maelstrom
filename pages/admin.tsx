import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TollIcon from '@mui/icons-material/Toll';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import {
  getAllBackstoriesByValidSessionToken,
  getAllNamesByValidSessionToken,
  getAllSettlementsByValidSessionToken,
} from '../database/admin';
import { Backstory, SavedBackstoryContent } from '../database/backstories';
import { FullSavedName, Name } from '../database/names';
import { SavedSettlementContent, Settlement } from '../database/settlements';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
  allBackstories: any;
  allNames: any;
  allSettlements: any;
};

export default function Admin(props: Props) {
  if (!props.user) {
    return (
      <>
        <Head>
          <title>User not found</title>
          <meta name="description" content="User not found" />
        </Head>
        <h1>404 - User not found</h1>
        Better luck next time
      </>
    );
  }

  return (
    <div>
      <Head>
        <title>Tapestry | Admin</title>
        <meta name="description" content="profile & saved texts" />
      </Head>
      <Box
        display="flex"
        sx={{ width: { xs: '100%', sm: '80%' } }}
        flexDirection="column"
        justifyContent="center"
        m="auto"
        mb="3rem"
      >
        <Typography variant="h1">Admin</Typography>
        <Grid
          container
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: '2rem' }}
        >
          <PersonOutlineIcon sx={{ mr: '0.5rem' }} />
          <Typography variant="body2" mr="2rem">
            {props.user.username}
          </Typography>
          <TollIcon sx={{ mr: '0.5rem' }} />
          <Typography variant="body2">credits: {props.user.credits}</Typography>
        </Grid>
        <Divider
          orientation="horizontal"
          color="#000"
          sx={{
            height: '1px',
            mt: '1rem',
            mb: '1rem',
          }}
        />
        <Grid
          container
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Names
            </Typography>
          </Grid>

          <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>First names</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.allNames.names.map((name: Name) => {
                return (
                  <Fragment key={name.id}>
                    <Grid container>
                      <Grid item xs={12} lg={7.3}>
                        <Typography variant="body2">{name.name}</Typography>
                      </Grid>
                      <Grid item xs={12} lg={0.2}>
                        <Divider
                          orientation="vertical"
                          color="#000"
                          sx={{
                            width: '1px',
                            m: 'auto',
                            display: { xs: 'none', lg: 'block' },
                          }}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        lg={4.5}
                        sx={{ mt: { xs: '1rem', lg: 0 } }}
                        justifyContent="center"
                      >
                        {/* <Button
                          variant="contained"
                          sx={{
                            mb: '0.5rem',
                            mr: '0.5rem',
                            width: 140,
                          }}
                          onClick={() => deleteName(firstName.id)}
                        >
                          <DeleteOutlineIcon sx={{ mr: '0.5rem' }} /> Delete
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Fragment>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Names migration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.allNames.names.map((name: Name) => {
                return (
                  <Fragment key={name.id}>
                    <Box>
                      {`{ name: '` +
                        name.name +
                        `', first_name: ` +
                        name.firstName +
                        `, first_name: ` +
                        name.lastName +
                        `, verified: ` +
                        name.verified +
                        ` },`}
                    </Box>
                  </Fragment>
                );
              })}
            </AccordionDetails>
          </Accordion>

          <Divider
            orientation="horizontal"
            color="#000"
            sx={{ height: '1px', mt: '1rem', mb: '1rem' }}
          />
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Backstories
            </Typography>
          </Grid>
          {props.allBackstories.backstoriesContent.map(
            (savedBackstoryContent: SavedBackstoryContent) => {
              return (
                <Fragment key={savedBackstoryContent.id}>
                  <Grid container>
                    <Grid item xs={12} lg={7.3}>
                      <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            {savedBackstoryContent.class}{' '}
                            {savedBackstoryContent.species} backstory
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" align="justify" mr="1rem">
                            {savedBackstoryContent.description}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12} lg={0.2}>
                      <Divider
                        orientation="vertical"
                        color="#000"
                        sx={{
                          width: '1px',
                          m: 'auto',
                          display: { xs: 'none', lg: 'block' },
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      lg={4.5}
                      sx={{ mt: { xs: '1rem', lg: 0 }, mb: 'auto' }}
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        sx={{
                          mb: '0.5rem',
                          mr: '0.5rem',
                          width: 140,
                        }}
                        onClick={() =>
                          deleteSavedBackstory(savedBackstoryContent.id)
                        }
                      >
                        <DeleteOutlineIcon sx={{ mr: '0.5rem' }} /> Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Fragment>
              );
            },
          )}

          <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Backstories migration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.allBackstories.backstories.map((backstory: Backstory) => {
                return (
                  <Fragment key={backstory.id}>
                    <Box>
                      {`{ class_id: ` +
                        backstory.classId +
                        `, species_id: ` +
                        backstory.speciesId +
                        `, backstory: "` +
                        backstory.description +
                        `", verified: ` +
                        backstory.verified +
                        `,},`}
                    </Box>
                  </Fragment>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Divider
            orientation="horizontal"
            color="#000"
            sx={{ height: '1px', mt: '1rem', mb: '1rem' }}
          />
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Saved Settlements
            </Typography>
          </Grid>
          {props.allSettlements.settlementsContent.map(
            (savedSettlementContent: SavedSettlementContent) => {
              return (
                <Fragment key={savedSettlementContent.id}>
                  <Grid container>
                    <Grid item xs={12} lg={7.3}>
                      <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            {savedSettlementContent.prosperity}{' '}
                            {savedSettlementContent.species}{' '}
                            {savedSettlementContent.size}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" align="justify" mr="1rem">
                            {savedSettlementContent.description}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                    <Grid item xs={12} lg={0.2}>
                      <Divider
                        orientation="vertical"
                        color="#000"
                        sx={{
                          width: '1px',
                          m: 'auto',
                          display: { xs: 'none', lg: 'block' },
                        }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      lg={4.5}
                      sx={{ mt: { xs: '1rem', lg: 0 }, mb: 'auto' }}
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        sx={{
                          mb: '0.5rem',
                          mr: '0.5rem',
                          width: 140,
                        }}
                        onClick={() =>
                          deleteSavedBackstory(savedBackstoryContent.id)
                        }
                      >
                        <DeleteOutlineIcon sx={{ mr: '0.5rem' }} /> Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Fragment>
              );
            },
          )}

          <Accordion sx={{ backgroundColor: '#F9E6C4', mb: '1px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Settlements migration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.allSettlements.settlements.map(
                (settlement: Settlement) => {
                  return (
                    <Fragment key={settlement.id}>
                      <Box>
                        {`{ prosperity_id: ` +
                          settlement.prosperityId +
                          `, species_id: ` +
                          settlement.speciesId +
                          `, size_id: ` +
                          settlement.sizeId +
                          `, description: "` +
                          settlement.description +
                          `, verified: ` +
                          settlement.verified +
                          `,},`}
                      </Box>
                    </Fragment>
                  );
                },
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));
  const allBackstories = await getAllBackstoriesByValidSessionToken(token);
  const allNames = await getAllNamesByValidSessionToken(token);
  const allSettlements = await getAllSettlementsByValidSessionToken(token);

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/generators',
        permanent: false,
      },
    };
  }
  if (user.id !== 1) {
    return {
      redirect: {
        destination: '/login?returnTo=/generators',
        permanent: false,
      },
    };
  }

  return {
    props: { user, allBackstories, allNames, allSettlements },
  };
}
