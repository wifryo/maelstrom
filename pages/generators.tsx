import MemoryIcon from '@mui/icons-material/Memory';
import SaveIcon from '@mui/icons-material/Save';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Backstory } from '../database/backstories';
import {
  CharacterClass,
  getCharacterClasses,
  getProsperities,
  getSizes,
  getSpecies,
  Prosperity,
  Size,
  Species,
} from '../database/lists';
import { Settlement } from '../database/settlements';
import { getUserBySessionToken } from '../database/users';
import { addNamesToText } from '../utils/functions';

type Props = {
  characterClasses: CharacterClass[];
  species: Species[];
  sizes: Size[];
  prosperities: Prosperity[];
  userId: number;
};

export default function Generators(props: Props) {
  // Name useStates/functions
  const [nameGenAiToggle, setNameGenAiToggle] = useState(false);

  const [fullName, setFullName] = useState({
    firstNameId: 13,
    firstName: 'Chogbert',
    lastNameId: 6,
    lastName: 'Brebblington',
  });
  // Unused AI name gen code, re-implement later
  /* const [generatedNameInput, setGeneratedNameInput] = useState('');
  const [generatedNameResult, setGeneratedNameResult] = useState();
  async function nameGeneratorSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/names/generate-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: generatedNameInput }),
    });
    const data = await response.json();
    setGeneratedNameResult(data.result);
  } */

  // Backstory useStates/functions
  const [backstoryGenAiToggle, setBackstoryGenAiToggle] = useState(false);
  const [backstoryLoading, setBackstoryLoading] = useState(false);
  const [backstoryError, setBackstoryError] = useState(false);

  const [selectedCharacterClass, setSelectedCharacterClass] =
    useState<CharacterClass>({
      id: 1,
      name: 'Barbarian',
    });
  const [selectedBackstorySpecies, setSelectedBackstorySpecies] =
    useState<Species>({
      id: 1,
      name: 'Dragonborn',
    });
  const [backstoryWithNames, setBackstoryWithNames] = useState('');
  const [backstory, setBackstory] = useState<Backstory>({
    id: 0,
    classId: 0,
    speciesId: 0,
    description: '',
    verified: false,
  });

  // Settlement useStates/functions
  const [settlementGenAiToggle, setSettlementGenAiToggle] = useState(false);
  const [settlementLoading, setSettlementLoading] = useState(false);
  const [settlementError, setSettlementError] = useState(false);

  const [settlement, setSettlement] = useState<Settlement>({
    id: null,
    sizeId: 0,
    prosperityId: 0,
    speciesId: 0,
    description: '',
    verified: false,
  });
  const [selectedSettlementProsperity, setSelectedSettlementProsperity] =
    useState<Prosperity>({
      id: 1,
      name: 'Destitute',
    });
  const [selectedSettlementSpecies, setSelectedSettlementSpecies] =
    useState<Species>({
      id: 1,
      name: 'Dragonborn',
    });
  const [selectedSettlementSize, setSelectedSettlementSize] = useState<Size>({
    id: 1,
    name: 'Hamlet',
  });

  return (
    <div>
      <Head>
        <title>Tapestry | Generators</title>
        <meta name="description" content="tapestry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        sx={{ width: { xs: '100%', sm: '80%' } }}
        flexDirection="column"
        justifyContent="center"
        m="auto"
        mb="3rem"
      >
        <Typography variant="h1" mb="2rem">
          Generators
        </Typography>

        <Typography variant="body2">
          Generate names, backstories and settlement descriptions for use in
          your tabletop RPG campaign. Saved texts can be found on your profile
          page. More generators coming soon!
        </Typography>

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
              Name generator
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={7.3} xl={8.5}>
              <Typography variant="body2">{`${fullName.firstName} ${fullName.lastName}`}</Typography>
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
              xl={3.3}
              sx={{ mt: { xs: '1rem', lg: 0 } }}
              justifyContent="center"
            >
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="center"
                flex-wrap="none"
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={nameGenAiToggle}
                      value={nameGenAiToggle}
                      onChange={(event) => {
                        setNameGenAiToggle(event.currentTarget.checked);
                      }}
                    />
                  }
                  label="AI assisted generation"
                />
                {nameGenAiToggle ? (
                  <Typography color="error.main">
                    Warning: costs 1 credit
                  </Typography>
                ) : (
                  <Typography> </Typography>
                )}

                <Button
                  variant="contained"
                  sx={{
                    mb: '0.5rem',
                    mr: '0.5rem',
                    width: 300,
                  }}
                  onClick={async () => {
                    /* if (nameGenAiToggle) { */
                    const response = await fetch('/api/names', {
                      method: 'GET',
                    });
                    const retrievedName = await response.json();
                    const newBackstoryWithNames = addNamesToText(
                      backstory.description,
                      retrievedName.firstName,
                      retrievedName.lastName,
                    );
                    setBackstoryWithNames(newBackstoryWithNames);
                    setFullName(retrievedName);
                    /* } else {
                    // generate name function goes here
                  } */
                  }}
                >
                  <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    mb: '0.5rem',
                    mr: '0.5rem',
                    width: 300,
                  }}
                  onClick={async () => {
                    const id = props.userId;
                    await fetch(`/api/users/names/${id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        userId: id,
                        firstNameId: fullName.firstNameId,
                        lastNameId: fullName.lastNameId,
                      }),
                    });
                  }}
                >
                  <SaveIcon sx={{ mr: '0.5rem' }} /> Save
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider
            orientation="horizontal"
            color="#000"
            sx={{ height: '1px', mt: '1rem', mb: '1rem' }}
          />
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Backstory generator
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs={12} lg={7.3} xl={8.5}>
              {backstoryLoading ? (
                <Typography justifySelf="center">loading...</Typography>
              ) : (
                <Typography variant="body2" align="justify" mr="1rem">
                  {backstoryError
                    ? 'No matching backstory found. Try generating with AI assist instead, or choose different options.'
                    : backstoryWithNames}
                </Typography>
              )}
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
              xl={3.3}
              sx={{ mt: { xs: '1rem', lg: 0 } }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="flex-start"
              mb="auto"
            >
              <FormControl sx={{ width: { xs: 300, lg: 200 } }}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={selectedCharacterClass.id}
                  sx={{ mb: '1rem', mr: '0.5rem' }}
                  label="Class"
                  onChange={(event) => {
                    // Get ID of selected characterClass
                    const characterClassId = Number(event.target.value);
                    // Use filter on characterClass object to get full characterClass object that corresponds to selected ID
                    const selectedCharacterClassArray =
                      props.characterClasses.filter((characterClass) => {
                        return characterClass.id === characterClassId;
                      });
                    // Check exists
                    if (selectedCharacterClassArray[0]) {
                      setSelectedCharacterClass(selectedCharacterClassArray[0]);
                    }
                  }}
                >
                  {props.characterClasses.map(
                    (characterClass: CharacterClass) => (
                      <MenuItem
                        key={characterClass.id}
                        value={characterClass.id}
                      >
                        {characterClass.name}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>

              <FormControl sx={{ width: { xs: 300, lg: 200 } }}>
                <InputLabel>Species</InputLabel>
                <Select
                  value={selectedBackstorySpecies.id}
                  sx={{ mb: '0.5rem', mr: '0.5rem' }}
                  label="Species"
                  onChange={(event) => {
                    // Get ID of selected species
                    const speciesId = Number(event.target.value);
                    // Use filter on species object to get full species object that corresponds to selected ID
                    const selectedBackstorySpeciesArray = props.species.filter(
                      (species) => {
                        return species.id === speciesId;
                      },
                    );
                    // Check exists
                    if (selectedBackstorySpeciesArray[0]) {
                      setSelectedBackstorySpecies(
                        selectedBackstorySpeciesArray[0],
                      );
                    }
                  }}
                >
                  {props.species.map((species: Species) => (
                    <MenuItem key={species.id} value={species.id}>
                      {species.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="center"
                flex-wrap="none"
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={backstoryGenAiToggle}
                      value={backstoryGenAiToggle}
                      onChange={(event) => {
                        setBackstoryGenAiToggle(event.currentTarget.checked);
                      }}
                    />
                  }
                  label="AI assisted generation"
                />
                {backstoryGenAiToggle ? (
                  <Typography color="error.main">
                    Warning: costs 1 credit
                  </Typography>
                ) : (
                  <Typography> </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                  onClick={async () => {
                    // if AI assist is enabled, use external API, otherwise fetch from database
                    if (backstoryGenAiToggle) {
                      // Construct prompt
                      setBackstoryError(false);
                      setBackstoryLoading(true);
                      const backstoryPrompt = `${selectedBackstorySpecies.name} ${selectedCharacterClass.name} named [firstName] [lastName]`;
                      // Construct backstory object without backstory text
                      const incompleteBackstoryObject: Backstory = {
                        id: null,
                        classId: selectedCharacterClass.id,
                        speciesId: selectedBackstorySpecies.id,
                        description: '',
                        verified: false,
                      };

                      // POST to API, sending both prompt & backstory object data so it can be added to database
                      const response = await fetch(
                        '/api/backstories/generate-backstory',
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            prompt: backstoryPrompt,
                            backstoryObject: incompleteBackstoryObject,
                          }),
                        },
                      );
                      // Receive complete backstory object
                      const backstoryObject = await response.json();
                      // Update useState with backstory object
                      setBackstory(backstoryObject);

                      // Embed generated names into backstory text
                      const backstoryTextWithNames = await addNamesToText(
                        backstoryObject.description,
                        fullName.firstName,
                        fullName.lastName,
                      );
                      // Update useStates
                      setBackstoryLoading(false);

                      setBackstoryWithNames(backstoryTextWithNames);
                    } else {
                      // Retrieve backstory by species and class
                      const response = await fetch('/api/backstories', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          speciesId: selectedBackstorySpecies.id,
                          characterClassId: selectedCharacterClass.id,
                        }),
                      });
                      let error = false;
                      setBackstoryError(false);
                      const retrievedBackstory = await response
                        .json()
                        .catch(() => {
                          setBackstoryError(true);
                          error = true;
                          return;
                        });
                      if (!error) {
                        setBackstory(retrievedBackstory);
                        const retrievedBackstoryWithNames = addNamesToText(
                          retrievedBackstory.description,
                          fullName.firstName,
                          fullName.lastName,
                        );
                        setBackstoryWithNames(retrievedBackstoryWithNames);
                      }
                    }
                  }}
                >
                  <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
                </Button>
              </Box>
              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  // Retrieve random backstory
                  setBackstoryError(false);

                  const response = await fetch('/api/backstories', {
                    method: 'GET',
                  });
                  const retrievedBackstory = await response.json();
                  setBackstory(retrievedBackstory);
                  const retrievedBackstoryWithNames = addNamesToText(
                    retrievedBackstory.description,
                    fullName.firstName,
                    fullName.lastName,
                  );
                  setBackstoryWithNames(retrievedBackstoryWithNames);
                }}
              >
                <ShuffleIcon sx={{ mr: '0.5rem' }} /> Random
              </Button>

              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  const id = props.userId;
                  await fetch(`/api/users/backstories/${id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId: id,
                      backstoryId: backstory.id,
                    }),
                  });
                }}
              >
                <SaveIcon sx={{ mr: '0.5rem' }} /> Save
              </Button>
            </Grid>
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
          <Grid item xs={12}>
            <Typography variant="h2" mt="1rem" mb="2rem">
              Settlement generator
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={12} lg={7.3} xl={8.5}>
              {settlementLoading ? (
                <Typography justifySelf="center">loading...</Typography>
              ) : (
                <Typography variant="body2" align="justify" mr="1rem">
                  {settlementError
                    ? 'No matching settlement found. Try generating with AI assist instead, or choose different options.'
                    : settlement.description}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} lg={0.2}>
              <Divider
                orientation="vertical"
                color="#000"
                sx={{ width: '1px', m: 'auto' }}
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              lg={4.5}
              xl={3.3}
              sx={{ mt: { xs: '1rem', lg: 0 } }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="flex-start"
            >
              <FormControl sx={{ width: { xs: 300, md: 200, lg: 200 } }}>
                <InputLabel>Prosperity</InputLabel>
                <Select
                  value={selectedSettlementProsperity.id}
                  sx={{ mb: '1rem', mr: '0.5rem' }}
                  label="Prosperity"
                  onChange={(event) => {
                    // Get ID of selected prosperity
                    const prosperityId = Number(event.target.value);
                    // Use filter on prosperities object to get full prosperities object that corresponds to selected ID
                    const selectedSettlementProsperityArray =
                      props.prosperities.filter((prosperity) => {
                        return prosperity.id === prosperityId;
                      });
                    // Check exists
                    if (selectedSettlementProsperityArray[0]) {
                      setSelectedSettlementProsperity(
                        selectedSettlementProsperityArray[0],
                      );
                    }
                  }}
                >
                  {props.prosperities.map((prosperity: Prosperity) => (
                    <MenuItem key={prosperity.id} value={prosperity.id}>
                      {prosperity.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: { xs: 300, md: 200, lg: 200 } }}>
                <InputLabel>Species</InputLabel>
                <Select
                  value={selectedSettlementSpecies.id}
                  sx={{ mb: '1rem', mr: '0.5rem' }}
                  label="Species"
                  onChange={(event) => {
                    // Get ID of selected species
                    const speciesId = Number(event.target.value);
                    // Use filter on species object to get full species object that corresponds to selected ID
                    const selectedSettlementSpeciesArray = props.species.filter(
                      (species) => {
                        return species.id === speciesId;
                      },
                    );
                    // Check exists
                    if (selectedSettlementSpeciesArray[0]) {
                      setSelectedSettlementSpecies(
                        selectedSettlementSpeciesArray[0],
                      );
                    }
                  }}
                >
                  {props.species.map((species: Species) => (
                    <MenuItem key={species.id} value={species.id}>
                      {species.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: { xs: 300, md: 200, lg: 200 } }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={selectedSettlementSize.id}
                  sx={{ mb: '1rem', mr: '0.5rem' }}
                  label="Size"
                  onChange={(event) => {
                    // Get ID of selected size
                    const sizeId = Number(event.target.value);
                    // Use filter on sizes object to get full sizes object that corresponds to selected ID
                    const selectedSettlementSizeArray = props.sizes.filter(
                      (size) => {
                        return size.id === sizeId;
                      },
                    );
                    // Check exists
                    if (selectedSettlementSizeArray[0]) {
                      setSelectedSettlementSize(selectedSettlementSizeArray[0]);
                    }
                  }}
                >
                  {props.sizes.map((size: Size) => (
                    <MenuItem key={size.id} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="center"
                flex-wrap="none"
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={settlementGenAiToggle}
                      value={settlementGenAiToggle}
                      onChange={(event) => {
                        setSettlementGenAiToggle(event.currentTarget.checked);
                      }}
                    />
                  }
                  label="AI assisted generation"
                />
                {settlementGenAiToggle ? (
                  <Typography color="error.main">
                    Warning: costs 1 credit
                  </Typography>
                ) : (
                  <Typography> </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                  onClick={async () => {
                    if (settlementGenAiToggle) {
                      // Construct prompt
                      setSettlementLoading(true);
                      setSettlementError(false);
                      const settlementPrompt = `${selectedSettlementProsperity.name} ${selectedSettlementSpecies.name} ${selectedSettlementSize.name}`;
                      // Construct settlement object without description
                      const incompleteSettlementObject: Settlement = {
                        id: null,
                        sizeId: selectedSettlementSize.id,
                        prosperityId: selectedSettlementProsperity.id,
                        speciesId: selectedSettlementSpecies.id,
                        description: '',
                        verified: false,
                      };
                      // POST to API, sending both prompt & settlement object data so it can be added to database
                      const response = await fetch(
                        '/api/settlements/generate-settlement',
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            prompt: settlementPrompt,
                            settlementObject: incompleteSettlementObject,
                          }),
                        },
                      );
                      // Received generated settlement object
                      const settlementObject = await response.json();
                      // Update useState
                      setSettlementLoading(false);
                      setSettlement(settlementObject);
                    } else {
                      // Retrieve settlement by size/species/prosperity
                      setSettlementError(false);

                      const response = await fetch('/api/settlements', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          sizeId: selectedSettlementSize.id,
                          speciesId: selectedSettlementSpecies.id,
                          prosperityId: selectedSettlementProsperity.id,
                        }),
                      });
                      let error = false;
                      const retrievedSettlement = await response
                        .json()
                        .catch(() => {
                          setSettlementError(true);
                          error = true;
                          return;
                        });
                      if (!error) {
                        setSettlement(retrievedSettlement);
                      }
                    }
                  }}
                >
                  <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
                </Button>
              </Box>
              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  // Retrieve random settlement
                  setSettlementError(false);

                  const response = await fetch('/api/settlements', {
                    method: 'GET',
                  });
                  const retrievedSettlement = await response.json();
                  setSettlement(retrievedSettlement);
                }}
              >
                <ShuffleIcon sx={{ mr: '0.5rem' }} /> Random
              </Button>

              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  const id = props.userId;
                  await fetch(`/api/users/settlements/${id}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId: id,
                      settlementId: settlement.id,
                    }),
                  });
                }}
              >
                <SaveIcon sx={{ mr: '0.5rem' }} /> Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<Props>> {
  const characterClasses = await getCharacterClasses();
  const species = await getSpecies();
  const sizes = await getSizes();
  const prosperities = await getProsperities();
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/generators',
        permanent: false,
      },
    };
  }
  const userId = user.id;

  return {
    props: {
      characterClasses: characterClasses,
      species: species,
      sizes: sizes,
      prosperities: prosperities,
      userId,
    },
  };
}
