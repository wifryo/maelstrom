import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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

type Props = {
  characterClasses: CharacterClass[];
  origins: Origin[];
  sizes: Size[];
  prosperityLevels: ProsperityLevel[];
  userId: number;
};

export default function Generators(props: Props) {
  // Name useStates/functions
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
  function addNamesToText(
    textInput: string,
    firstName: string,
    lastName: string,
  ) {
    let textOutput = textInput.replaceAll('[firstName]', firstName);
    textOutput = textOutput.replaceAll('FirstName', firstName);
    textOutput = textOutput.replaceAll('[lastName]', lastName);
    return textOutput;
  }

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
      <Box display="flex" justifyContent="center">
        <br />
        <main>
          <Typography variant="h1">Generators</Typography>
          <Typography variant="h2">Name generator</Typography>
          <br />
          <form onSubmit={nameGeneratorSubmit}>
            <input
              placeholder="Enter an adjective"
              value={generatedNameInput}
              onChange={(e) => setGeneratedNameInput(e.target.value)}
            />
            <input type="submit" value="Generate name" />
          </form>
          <Typography>{generatedNameResult}</Typography>
          <br />
          <Button
            variant="outlined"
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
            Generate Name
          </Button>

          <Typography variant="h3">{`${fullName.firstName} ${fullName.lastName}`}</Typography>

          <Button
            variant="outlined"
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
            Save Name
          </Button>
          <hr />

          <Typography variant="h2">Backstory generator</Typography>
          <br />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedCharacterClass.id}
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
              {props.characterClasses.map((characterClass: CharacterClass) => (
                <MenuItem key={characterClass.id} value={characterClass.id}>
                  {characterClass.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Origin</InputLabel>
            <Select
              value={selectedBackstoryOrigin.id}
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
                  setSelectedBackstoryOrigin(selectedBackstoryOriginArray[0]);
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
          <br />
          <Button
            variant="outlined"
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
            Generate Backstory
          </Button>

          <br />

          <Button
            variant="outlined"
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
            Random Backstory
          </Button>

          <Button
            variant="outlined"
            onClick={async () => {
              // Retrieve backstory
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
            Retrieve Backstory
          </Button>

          <Button
            variant="outlined"
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
            Save Backstory
          </Button>

          <Typography variant="body2">{backstoryWithNames}</Typography>

          <hr />

          <Typography variant="h2">Settlement generator</Typography>
          <br />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Prosperity</InputLabel>
            <Select
              value={selectedSettlementProsperity.id}
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
                  <MenuItem key={prosperityLevel.id} value={prosperityLevel.id}>
                    {prosperityLevel.name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Origin</InputLabel>
            <Select
              value={selectedSettlementOrigin.id}
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
                  setSelectedSettlementOrigin(selectedSettlementOriginArray[0]);
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSettlementSize.id}
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
            variant="outlined"
            onClick={async () => {
              // Construct prompt
              const settlementPrompt = `${selectedSettlementProsperity.name} ${selectedSettlementOrigin.name} ${selectedSettlementSize.name}`;
              // Construct settlement object without description
              const settlementObject: Settlement = {
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
                    settlementObject: settlementObject,
                  }),
                },
              );
              // Received generated settlement description
              const generatedSettlementDescription = await response.json();
              // Add generated description to settlement object
              settlementObject.description =
                generatedSettlementDescription.result;
              // Update useState
              setSettlement(settlementObject);
            }}
          >
            Generate Settlement
          </Button>

          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              // Retrieve random settlement
              const response = await fetch('/api/settlements', {
                method: 'GET',
              });
              const retrievedSettlement = await response.json();
              setSettlement(retrievedSettlement);
            }}
          >
            Retrieve Settlement
          </Button>

          <Button
            variant="outlined"
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
            Save Settlement
          </Button>
          <Typography variant="body2">{settlement.description}</Typography>
        </main>
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
