import MemoryIcon from '@mui/icons-material/Memory';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
  getOrigins,
  getProsperityLevels,
  getSizes,
  Origin,
  ProsperityLevel,
  Size,
} from '../database/lists';
import { Settlement } from '../database/settlements';
import { getUserBySessionToken } from '../database/users';
import { addNamesToText } from '../utils/functions';

type Props = {
  characterClasses: CharacterClass[];
  origins: Origin[];
  sizes: Size[];
  prosperityLevels: ProsperityLevel[];
  userId: number;
};

export default function Generators(props: Props) {
  // Name useStates/functions
  const [nameGenAiToggle, setNameGenAiToggle] = useState(false);
  const [generatedNameInput, setGeneratedNameInput] = useState('');
  const [generatedNameResult, setGeneratedNameResult] = useState();
  const [fullName, setFullName] = useState({
    firstNameId: 0,
    firstName: '',
    lastNameId: 0,
    lastName: '',
  });
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
  }

  // Backstory useStates/functions
  const [selectedCharacterClass, setSelectedCharacterClass] =
    useState<CharacterClass>({
      id: 1,
      name: 'Barbarian',
    });
  const [selectedBackstoryOrigin, setSelectedBackstoryOrigin] =
    useState<Origin>({
      id: 1,
      name: 'Dragonborn',
    });
  const [backstoryWithNames, setBackstoryWithNames] = useState('');
  const [backstory, setBackstory] = useState<Backstory>({
    id: 0,
    classId: 0,
    originId: 0,
    firstNameId: 0,
    lastNameId: 0,
    backstory: '',
    verified: false,
  });

  // Settlement useStates/functions
  const [settlement, setSettlement] = useState<Settlement>({
    id: null,
    sizeId: 0,
    prosperityId: 0,
    originId: 0,
    description: '',
    verified: false,
  });
  const [selectedSettlementProsperity, setSelectedSettlementProsperity] =
    useState<ProsperityLevel>({
      id: 1,
      name: 'Destitute',
    });
  const [selectedSettlementOrigin, setSelectedSettlementOrigin] =
    useState<Origin>({
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
        <title>Home</title>
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
            <Grid item xs={12} lg={7.3}>
              {/* <form onSubmit={nameGeneratorSubmit}>
              <input
                placeholder="Enter an adjective"
                value={generatedNameInput}
                onChange={(e) => setGeneratedNameInput(e.target.value)}
              />
              <input type="submit" value="Generate name" />
            </form>
            <Typography>{generatedNameResult}</Typography> */}
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
              sx={{ mt: { xs: '1rem', lg: 0 } }}
              justifyContent="center"
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
              {/* <FormControlLabel
                disabled
                control={<Switch />}
                label="Disabled control example"
              /> */}

              <Button
                variant="contained"
                sx={{
                  mb: '0.5rem',
                  mr: '0.5rem',
                  width: 300,
                }}
                onClick={async () => {
                  const response = await fetch('/api/names', {
                    method: 'GET',
                  });
                  const retrievedName = await response.json();
                  const newBackstoryWithNames = addNamesToText(
                    backstory.backstory,
                    retrievedName.firstName,
                    retrievedName.lastName,
                  );
                  setBackstoryWithNames(newBackstoryWithNames);
                  setFullName(retrievedName);
                }}
              >
                <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
              </Button>

              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
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
            <Grid item xs={12} lg={7.3}>
              <Typography variant="body2" align="justify" mr="1rem">
                {backstoryWithNames}
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
                <InputLabel>Origin</InputLabel>
                <Select
                  value={selectedBackstoryOrigin.id}
                  sx={{ mb: '0.5rem', mr: '0.5rem' }}
                  label="Origin"
                  onChange={(event) => {
                    // Get ID of selected origin
                    const originId = Number(event.target.value);
                    // Use filter on origins object to get full origins object that corresponds to selected ID
                    const selectedBackstoryOriginArray = props.origins.filter(
                      (origin) => {
                        return origin.id === originId;
                      },
                    );
                    // Check exists
                    if (selectedBackstoryOriginArray[0]) {
                      setSelectedBackstoryOrigin(
                        selectedBackstoryOriginArray[0],
                      );
                    }
                  }}
                >
                  {props.origins.map((origins: Origin) => (
                    <MenuItem key={origins.id} value={origins.id}>
                      {origins.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{
                  mb: '0.5rem',
                  mr: '0.5rem',
                  width: 300,
                }}
                onClick={async () => {
                  // Construct prompt
                  const backstoryPrompt = `${selectedBackstoryOrigin.name} ${selectedCharacterClass.name} named [firstName] [lastName]`;
                  // Construct backstory object without backstory text
                  const incompleteBackstoryObject: Backstory = {
                    id: null,
                    classId: selectedCharacterClass.id,
                    originId: selectedBackstoryOrigin.id,
                    firstNameId: fullName.firstNameId,
                    lastNameId: fullName.lastNameId,
                    backstory: '',
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
                    backstoryObject.backstory,
                    fullName.firstName,
                    fullName.lastName,
                  );
                  // Update useStates
                  setBackstoryWithNames(backstoryTextWithNames);
                }}
              >
                <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
              </Button>

              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  // Retrieve random backstory
                  const response = await fetch('/api/backstories', {
                    method: 'GET',
                  });
                  const retrievedBackstory = await response.json();
                  setBackstory(retrievedBackstory);
                  const retrievedBackstoryWithNames = addNamesToText(
                    retrievedBackstory.backstory,
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
                  // Retrieve backstory by origin and class
                  const response = await fetch('/api/backstories', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      originId: selectedBackstoryOrigin.id,
                      characterClassId: selectedCharacterClass.id,
                    }),
                  });
                  const retrievedBackstory = await response.json();
                  setBackstory(retrievedBackstory);
                  const retrievedBackstoryWithNames = addNamesToText(
                    retrievedBackstory.backstory,
                    fullName.firstName,
                    fullName.lastName,
                  );
                  setBackstoryWithNames(retrievedBackstoryWithNames);
                }}
              >
                <SaveAltIcon sx={{ mr: '0.5rem' }} /> Retrieve
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
            <Grid item xs={12} lg={7.3}>
              <Typography variant="body2" align="justify" mr="1rem">
                {settlement.description}
              </Typography>
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
                    // Get ID of selected prosperityLevel
                    const prosperityLevelId = Number(event.target.value);
                    // Use filter on prosperityLevels object to get full prosperityLevels object that corresponds to selected ID
                    const selectedSettlementProsperityLevelArray =
                      props.prosperityLevels.filter((prosperityLevel) => {
                        return prosperityLevel.id === prosperityLevelId;
                      });
                    // Check exists
                    if (selectedSettlementProsperityLevelArray[0]) {
                      setSelectedSettlementProsperity(
                        selectedSettlementProsperityLevelArray[0],
                      );
                    }
                  }}
                >
                  {props.prosperityLevels.map(
                    (prosperityLevel: ProsperityLevel) => (
                      <MenuItem
                        key={prosperityLevel.id}
                        value={prosperityLevel.id}
                      >
                        {prosperityLevel.name}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>

              <FormControl sx={{ width: { xs: 300, md: 200, lg: 200 } }}>
                <InputLabel>Origin</InputLabel>
                <Select
                  value={selectedSettlementOrigin.id}
                  sx={{ mb: '1rem', mr: '0.5rem' }}
                  label="Origin"
                  onChange={(event) => {
                    // Get ID of selected origin
                    const originId = Number(event.target.value);
                    // Use filter on origins object to get full origins object that corresponds to selected ID
                    const selectedSettlementOriginArray = props.origins.filter(
                      (origin) => {
                        return origin.id === originId;
                      },
                    );
                    // Check exists
                    if (selectedSettlementOriginArray[0]) {
                      setSelectedSettlementOrigin(
                        selectedSettlementOriginArray[0],
                      );
                    }
                  }}
                >
                  {props.origins.map((origin: Origin) => (
                    <MenuItem key={origin.id} value={origin.id}>
                      {origin.name}
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
              <br />
              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  // Construct prompt
                  const settlementPrompt = `${selectedSettlementProsperity.name} ${selectedSettlementOrigin.name} ${selectedSettlementSize.name}`;
                  // Construct settlement object without description
                  const incompleteSettlementObject: Settlement = {
                    id: null,
                    sizeId: selectedSettlementSize.id,
                    prosperityId: selectedSettlementProsperity.id,
                    originId: selectedSettlementOrigin.id,
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
                  setSettlement(settlementObject);
                  console.log(settlementObject);
                }}
              >
                <MemoryIcon sx={{ mr: '0.5rem' }} /> Generate
              </Button>

              <br />
              <Button
                variant="contained"
                sx={{ mb: '0.5rem', mr: '0.5rem', width: 300 }}
                onClick={async () => {
                  // Retrieve random settlement
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
                  // Retrieve settlement by size/origin/prosperity
                  console.log(`settlementsizeid: ${selectedSettlementSize.id}`);
                  console.log(
                    `settlementoriginid: ${selectedSettlementOrigin.id}`,
                  );
                  console.log(
                    `settlementprosperitynid: ${selectedSettlementProsperity.id}`,
                  );

                  const response = await fetch('/api/settlements', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      sizeId: selectedSettlementSize.id,
                      originId: selectedSettlementOrigin.id,
                      prosperityId: selectedSettlementProsperity.id,
                    }),
                  });
                  const retrievedSettlement = await response.json();
                  setSettlement(retrievedSettlement);
                }}
              >
                <SaveAltIcon sx={{ mr: '0.5rem' }} /> Retrieve
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
  const origins = await getOrigins();
  const sizes = await getSizes();
  const prosperityLevels = await getProsperityLevels();
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
  const userId = user.id;

  return {
    props: {
      characterClasses: characterClasses,
      origins: origins,
      sizes: sizes,
      prosperityLevels: prosperityLevels,
      userId,
    },
  };
}
