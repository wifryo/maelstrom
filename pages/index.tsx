import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
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
import styles from './index.module.css';

type Props = {
  characterClasses: CharacterClass[];
  origins: Origin[];
  sizes: Size[];
  prosperityLevels: ProsperityLevel[];
  userId: number;
};

export default function Home(props: Props) {
  const [generatedBackstoryResult, setGeneratedBackstoryResult] = useState();
  const [selectedCharacterClass, setSelectedCharacterClass] =
    useState('Barbarian');
  const [selectedBackstoryOrigin, setSelectedBackstoryOrigin] =
    useState('Dragonborn');
  const [retrievedBackstoryResult, setRetrievedBackstoryResult] = useState();
  const [selectedSettlementProsperity, setSelectedSettlementProsperity] =
    useState('Average');
  const [selectedSettlementSize, setSelectedSettlementSize] = useState('Town');
  const [selectedSettlementOrigin, setSelectedSettlementOrigin] =
    useState('Human');
  const [generatedSettlementResult, setGeneratedSettlementResult] = useState();

  const [generatedNameInput, setGeneratedNameInput] = useState('');
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
  }

  const [retrievedNameResult, setRetrievedNameResult] = useState('Grabnart');
  const [retrievedFirstNameId, setRetrievedFirstNameId] = useState();
  const [retrievedLastNameId, setRetrievedLastNameId] = useState();

  async function nameRetrieverSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/names', {
      method: 'GET',
    });
    const fullName = await response.json();
    setRetrievedNameResult(`${fullName.firstName} ${fullName.lastName}`);
    setRetrievedFirstNameId(fullName.firstNameId);
    setRetrievedLastNameId(fullName.lastNameId);
  }

  async function saveGeneratedNameToProfile(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = props.userId;

    const response = await fetch(`/api/users/names/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        firstNameId: retrievedFirstNameId,
        lastNameId: retrievedLastNameId,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  async function backstoryGeneratorSubmit(event: React.SyntheticEvent) {
    const backstoryInput = `${selectedBackstoryOrigin} ${selectedCharacterClass} named ${retrievedNameResult}`;
    event.preventDefault();
    const response = await fetch('/api/backstories/generate-backstory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: backstoryInput }),
    });
    const data = await response.json();
    setGeneratedBackstoryResult(data.result);
  }

  async function backstoryRetrieverSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/backstories', {
      method: 'GET',
    });
    const data = await response.json();
    const backstory = data[0].backstory;
    setRetrievedBackstoryResult(backstory);
  }

  async function settlementGeneratorSubmit(event: React.SyntheticEvent) {
    const backstoryInput = `${selectedSettlementProsperity} ${selectedSettlementOrigin} ${selectedSettlementSize}`;
    event.preventDefault();
    const response = await fetch('/api/settlements/generate-settlement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: backstoryInput }),
    });
    const data = await response.json();
    setGeneratedSettlementResult(data.result);
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="tapestry" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3>External API name generator</h3>
        <form onSubmit={nameGeneratorSubmit}>
          <input
            placeholder="Enter an adjective"
            value={generatedNameInput}
            onChange={(e) => setGeneratedNameInput(e.target.value)}
          />
          <input type="submit" value="Generate name" />
        </form>
        <div className={styles.result}>{generatedNameResult}</div>
        <h3>Internal database name generator</h3>
        <form onSubmit={nameRetrieverSubmit}>
          <input type="submit" value="Generate name" />
        </form>
        <div className={styles.result}>{retrievedNameResult}</div>
        <form onSubmit={saveGeneratedNameToProfile}>
          <input type="submit" value="Save to profile" />
        </form>

        <h3>External API backstory generator</h3>
        <form onSubmit={backstoryGeneratorSubmit}>
          <select
            value={selectedCharacterClass}
            onChange={(event) => setSelectedCharacterClass(event.target.value)}
          >
            {props.characterClasses.map((characterClass: CharacterClass) => (
              <option key={characterClass.id}>{characterClass.name}</option>
            ))}
          </select>
          <select
            value={selectedBackstoryOrigin}
            onChange={(event) => setSelectedBackstoryOrigin(event.target.value)}
          >
            {props.origins.map((origins: Origin) => (
              <option key={origins.id}>{origins.name}</option>
            ))}
          </select>

          <input type="submit" value="Generate backstory" />
        </form>
        <div className={styles.result}>{generatedBackstoryResult}</div>

        <h3>Internal database backstory generator</h3>
        <form onSubmit={backstoryRetrieverSubmit}>
          <input type="submit" value="Generate backstory" />
        </form>
        <div className={styles.result}>{retrievedBackstoryResult}</div>

        <h3>External API settlement generator</h3>
        <form onSubmit={settlementGeneratorSubmit}>
          <select
            value={selectedSettlementSize}
            onChange={(event) => setSelectedSettlementSize(event.target.value)}
          >
            {props.sizes.map((size: Size) => (
              <option key={size.id}>{size.name}</option>
            ))}
          </select>
          <select
            value={selectedSettlementOrigin}
            onChange={(event) =>
              setSelectedSettlementOrigin(event.target.value)
            }
          >
            {props.origins.map((origins: Origin) => (
              <option key={origins.id}>{origins.name}</option>
            ))}
          </select>
          <select
            value={selectedSettlementProsperity}
            onChange={(event) =>
              setSelectedSettlementProsperity(event.target.value)
            }
          >
            {props.prosperityLevels.map((prosperityLevel: ProsperityLevel) => (
              <option key={prosperityLevel.id}>{prosperityLevel.name}</option>
            ))}
          </select>

          <input type="submit" value="Generate settlement" />
        </form>
        <div className={styles.result}>{generatedSettlementResult}</div>
      </main>
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
