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
import Backstory from '../database/backstories';
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
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  characterClasses: CharacterClass[];
  origins: Origin[];
  sizes: Size[];
  prosperityLevels: ProsperityLevel[];
  userId: number;
};

export default function Generators(props: Props) {
  const [generatedNameInput, setGeneratedNameInput] = useState('');
  const [generatedNameResult, setGeneratedNameResult] = useState();
  const [fullName, setFullName] = useState({
    firstNameId: 0,
    firstName: '',
    lastNameId: 0,
    lastName: '',
  });
  const [generatedBackstoryResult, setGeneratedBackstoryResult] = useState();
  const [selectedCharacterClass, setSelectedCharacterClass] =
    useState('Barbarian');
  const [selectedBackstoryOrigin, setSelectedBackstoryOrigin] = useState({
    id: '',
    name: '',
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

  const [backstory, setBackstory] = useState({
    id: 0,
    classId: 0,
    firstNameId: 0,
    lastNameId: 0,
    backstory: '',
    verified: false,
  });

  const [selectedSettlementProsperity, setSelectedSettlementProsperity] =
    useState('Wealthy');
  const [selectedSettlementSize, setSelectedSettlementSize] = useState('Town');
  const [selectedSettlementOrigin, setSelectedSettlementOrigin] =
    useState('Human');
  const [generatedSettlementResult, setGeneratedSettlementResult] = useState();

  const [retrievedSettlementResult, setRetrievedSettlementResult] = useState();
  const [retrievedSettlementId, setRetrievedSettlementId] = useState();

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
              value={selectedCharacterClass}
              label="Class"
              onChange={(event) => {
                setSelectedCharacterClass(event.target.value);
              }}
            >
              {props.characterClasses.map((characterClass: CharacterClass) => (
                <MenuItem key={characterClass.id} value={characterClass.name}>
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
                const originId = Number(event.target.value);
                const selectedBackstoryOriginArray: Origin[] =
                  props.origins.filter((origin) => {
                    return origin.id === originId;
                  });
                setSelectedBackstoryOrigin(selectedBackstoryOriginArray[0]);
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
              const backstoryInput = `${selectedBackstoryOrigin} ${selectedCharacterClass} named ${`${fullName.firstName} ${fullName.lastName}`}`;
              const response = await fetch(
                '/api/backstories/generate-backstory',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ prompt: backstoryInput }),
                },
              );
              const generatedBackstory = await response.json();
              /* const completeBackstory: Backstory = {
                classId: number,
                originId: number,
                firstNameId: number,
                lastNameId: number,
                backstory: generatedBackstory.result,
                verified: boolean,

              } */
              setGeneratedBackstoryResult(generatedBackstory.result);
            }}
          >
            Generate Backstory
          </Button>
          <Button variant="outlined" onClick={async () => {}}>
            Save Generated Backstory
          </Button>
          <br />

          <Button
            variant="outlined"
            onClick={async () => {
              const response = await fetch('/api/backstories', {
                method: 'GET',
              });
              const retrievedBackstory = await response.json();
              console.log(retrievedBackstory);
              setBackstory(retrievedBackstory);
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
            Save Retrieved Backstory
          </Button>

          <Typography variant="body2">{generatedBackstoryResult}</Typography>
          <Typography variant="body2">{backstory.backstory}</Typography>

          <hr />

          <Typography variant="h2">Settlement generator</Typography>
          <br />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSettlementSize}
              label="Size"
              onChange={(event) => {
                setSelectedSettlementSize(event.target.value);
              }}
            >
              {props.sizes.map((size: Size) => (
                <MenuItem key={size.id} value={size.name}>
                  {size.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Origin</InputLabel>
            <Select
              value={selectedSettlementOrigin}
              label="Origin"
              onChange={(event) => {
                setSelectedSettlementOrigin(event.target.value);
              }}
            >
              {props.origins.map((origin: Origin) => (
                <MenuItem key={origin.id} value={origin.name}>
                  {origin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Prosperity</InputLabel>
            <Select
              value={selectedSettlementProsperity}
              label="Prosperity"
              onChange={(event) => {
                setSelectedSettlementProsperity(event.target.value);
              }}
            >
              {props.prosperityLevels.map(
                (prosperityLevel: ProsperityLevel) => (
                  <MenuItem
                    key={prosperityLevel.id}
                    value={prosperityLevel.name}
                  >
                    {prosperityLevel.name}
                  </MenuItem>
                ),
              )}
            </Select>
          </FormControl>
          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              const backstoryInput = `${selectedSettlementProsperity} ${selectedSettlementOrigin} ${selectedSettlementSize}`;
              const response = await fetch(
                '/api/settlements/generate-settlement',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ prompt: backstoryInput }),
                },
              );
              const data = await response.json();
              setGeneratedSettlementResult(data.result);
            }}
          >
            Generate Settlement
          </Button>

          <Typography variant="body2">{generatedSettlementResult}</Typography>

          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              const response = await fetch('/api/settlements', {
                method: 'GET',
              });
              const data = await response.json();
              const settlementDescription = data[0].description;
              setRetrievedSettlementResult(settlementDescription);
              setRetrievedSettlementId(data[0].id);
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
                  settlementId: retrievedSettlementId,
                }),
              });
            }}
          >
            Save Settlement
          </Button>
          <Typography variant="body2">{retrievedSettlementResult}</Typography>
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
