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
  const [selectedBackstoryOrigin, setSelectedBackstoryOrigin] =
    useState('Dragonborn');

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

  // maybe delete if not needed - could be useful to combine with other retrieval functions
  async function retrieveName(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/names', {
      method: 'GET',
    });
    const retrievedName = await response.json();
    setFullName(retrievedName);
  }

  async function saveRetrievedNameToProfile(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = props.userId;
    const response = await fetch(`/api/users/names/${id}`, {
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
    const data = await response.json();
    console.log(data);
  }

  async function backstoryGeneratorSubmit(event: React.SyntheticEvent) {
    const backstoryInput = `${selectedBackstoryOrigin} ${selectedCharacterClass} named ${`${fullName.firstName} ${fullName.lastName}`}`;
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

  const [backstory, setBackstory] = useState({
    id: 0,
    classId: 0,
    firstNameId: 0,
    lastNameId: 0,
    backstory: '',
    verified: false,
  });

  async function backstoryRetrieverSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/backstories', {
      method: 'GET',
    });
    const data = await response.json();
    const backstoryObject = data[0];
    console.log(backstoryObject);
    setBackstory(backstoryObject);
  }

  async function saveRetrievedBackstoryToProfile(event: React.SyntheticEvent) {
    event.preventDefault();
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
  }

  const [selectedSettlementProsperity, setSelectedSettlementProsperity] =
    useState('Average');
  const [selectedSettlementSize, setSelectedSettlementSize] = useState('Town');
  const [selectedSettlementOrigin, setSelectedSettlementOrigin] =
    useState('Human');
  const [generatedSettlementResult, setGeneratedSettlementResult] = useState();

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

  const [retrievedSettlementResult, setRetrievedSettlementResult] = useState();
  const [retrievedSettlementId, setRetrievedSettlementId] = useState();

  async function settlementRetrieverSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch('/api/settlements', {
      method: 'GET',
    });
    const data = await response.json();
    const settlementDescription = data[0].description;
    setRetrievedSettlementResult(settlementDescription);
    setRetrievedSettlementId(data[0].id);
  }

  async function saveRetrievedSettlementToProfile(event: React.SyntheticEvent) {
    event.preventDefault();
    const id = props.userId;
    const response = await fetch(`/api/users/settlements/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        settlementId: retrievedSettlementId,
      }),
    });
    const data = await response.json();
    console.log(data);
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

        <button
          onClick={async () => {
            const response = await fetch('/api/names', {
              method: 'GET',
            });
            const retrievedName = await response.json();
            setFullName(retrievedName);
          }}
        >
          GenerateName
        </button>
        <div
          className={styles.result}
        >{`${fullName.firstName} ${fullName.lastName}`}</div>
        {/* <form
          onSubmit={async () =>
            await fetch(`/api/users/names/${props.userId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: props.userId,
                firstNameId: fullName.firstNameId,
                lastNameId: fullName.lastNameId,
              }),
            })
          }
        >
          <input type="submit" value="Save name to profile" />
        </form> */}
        <form onSubmit={saveRetrievedNameToProfile}>
          <input type="submit" value="Save name to profile" />
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
        <div className={styles.result}>{backstory.backstory}</div>
        <form onSubmit={saveRetrievedBackstoryToProfile}>
          <input type="submit" value="Save backstory to profile" />
        </form>
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
        <h3>Internal database settlement generator</h3>
        <form onSubmit={settlementRetrieverSubmit}>
          <input type="submit" value="Generate settlement" />
        </form>
        <div className={styles.result}>{retrievedSettlementResult}</div>
        <form onSubmit={saveRetrievedSettlementToProfile}>
          <input type="submit" value="Save settlement to profile" />
        </form>
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
