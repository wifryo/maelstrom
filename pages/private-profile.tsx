import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import TollIcon from '@mui/icons-material/Toll';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { SavedBackstoryContent } from '../database/backstories';
import { FullSavedName } from '../database/names';
import { SavedSettlementContent } from '../database/settlements';
import { getUserBySessionToken, User } from '../database/users';
import { addNamesToText } from '../utils/functions';

type Props = {
  user?: User;
};

export default function UserProfile(props: Props) {
  const [retrievedSavedNames, setRetrievedSavedNames] = useState([
    { id: 0, firstNameId: 0, firstName: '', lastNameId: 0, lastName: '' },
  ]);

  async function getSavedNames(id: number) {
    const response = await fetch(`/api/users/names/${id}`, {
      method: 'GET',
    });
    const savedNames = await response.json();
    setRetrievedSavedNames(savedNames[0]);
  }

  async function deleteSavedName(id: number) {
    const response = await fetch(`/api/savedNames/${id}`, {
      method: 'DELETE',
    });
    const deletedSavedName = await response.json();
    const filteredSavedNames = retrievedSavedNames.filter((savedName) => {
      return savedName.id !== deletedSavedName.id;
    });
    setRetrievedSavedNames(filteredSavedNames);
  }

  useEffect(() => {
    if (!props.user?.id) {
      return;
    }
    getSavedNames(props.user.id).catch((err) => {
      console.log(err);
    });
  }, []);

  const [retrievedSavedBackstories, setRetrievedSavedBackstories] = useState([
    {
      id: 0,
      class: '',
      origin: '',
      firstName: '',
      lastName: '',
      backstory: '',
      verified: false,
    },
  ]);

  async function getSavedBackstories(id: number) {
    const response = await fetch(`/api/users/backstories/${id}`, {
      method: 'GET',
    });
    const savedBackstories = await response.json();
    savedBackstories.forEach((backstory: SavedBackstoryContent) => {
      const backstoryWithNames = addNamesToText(
        backstory.backstory,
        backstory.firstName,
        backstory.lastName,
      );
      backstory.backstory = backstoryWithNames;
    });
    setRetrievedSavedBackstories(savedBackstories);
  }

  async function deleteSavedBackstory(id: number) {
    const response = await fetch(`/api/savedBackstories/${id}`, {
      method: 'DELETE',
    });
    const deletedSavedBackstory = await response.json();
    const filteredSavedBackstories = retrievedSavedBackstories.filter(
      (savedBackstory) => {
        return savedBackstory.id !== deletedSavedBackstory.id;
      },
    );
    setRetrievedSavedBackstories(filteredSavedBackstories);
  }

  useEffect(() => {
    if (!props.user?.id) {
      return;
    }
    getSavedBackstories(props.user.id).catch((err) => {
      console.log(err);
    });
  }, []);

  const [retrievedSavedSettlements, setRetrievedSavedSettlements] = useState([
    {
      id: 0,
      size: '',
      prosperity: '',
      origin: '',
      description: '',
      verified: false,
    },
  ]);

  async function getSavedSettlements(id: number) {
    const response = await fetch(`/api/users/settlements/${id}`, {
      method: 'GET',
    });
    const savedSettlements = await response.json();
    setRetrievedSavedSettlements(savedSettlements[0]);
  }

  async function deleteSavedSettlement(id: number) {
    const response = await fetch(`/api/settlements/${id}`, {
      method: 'DELETE',
    });
    const deletedSavedSettlement = await response.json();
    const filteredSavedSettlements = retrievedSavedSettlements.filter(
      (savedSettlement: SavedSettlementContent) => {
        return savedSettlement.id !== deletedSavedSettlement.id;
      },
    );
    setRetrievedSavedSettlements(filteredSavedSettlements);
  }

  useEffect(() => {
    if (!props.user?.id) {
      return;
    }
    getSavedSettlements(props.user.id).catch((err) => {
      console.log(err);
    });
  }, []);

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
        <title>Profile</title>
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
        <Typography variant="h1">Profile</Typography>
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mt: '2rem' }}
        >
          <PersonOutlineIcon sx={{ mr: '0.5rem' }} />
          <Typography variant="body2" mr="2rem">
            username:{props.user.username}
          </Typography>
          <TollIcon sx={{ mr: '0.5rem' }} />
          <Typography variant="body2">
            remaining credits:
            {props.user.credits}
          </Typography>
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
              Saved Names
            </Typography>
          </Grid>
          {retrievedSavedNames.map((fullSavedName: FullSavedName) => {
            return (
              <Fragment
                key={`${fullSavedName.firstNameId}_${fullSavedName.lastNameId}`}
              >
                <Grid container>
                  <Grid item xs={12} lg={7.3}>
                    <Typography variant="body2">
                      {fullSavedName.firstName} {fullSavedName.lastName}
                    </Typography>
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
                    <Button
                      variant="contained"
                      sx={{
                        mb: '0.5rem',
                        mr: '0.5rem',
                        width: 140,
                      }}
                      onClick={() => deleteSavedName(fullSavedName.id)}
                    >
                      <DeleteOutlineIcon sx={{ mr: '0.5rem' }} /> Delete
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            );
          })}
          <Divider
            orientation="horizontal"
            color="#000"
            sx={{ height: '1px', mt: '1rem', mb: '1rem' }}
          />
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Saved Backstories
            </Typography>
          </Grid>
          {retrievedSavedBackstories.map(
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
                            {savedBackstoryContent.origin} backstory
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" align="justify" mr="1rem">
                            {savedBackstoryContent.backstory}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>

                      {/* <Typography variant="body2" align="justify" mr="1rem">
                        {savedBackstoryContent.backstory}
                      </Typography> */}
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
          {retrievedSavedSettlements.map((savedSettlementContent) => {
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
                          {savedSettlementContent.origin}{' '}
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
                        deleteSavedSettlement(savedSettlementContent.id)
                      }
                    >
                      <DeleteOutlineIcon sx={{ mr: '0.5rem' }} /> Delete
                    </Button>
                  </Grid>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}
