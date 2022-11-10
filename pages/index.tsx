import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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
import styles from './index.module.css';

type Props = {
  characterClasses: CharacterClass[];
  origins: Origin[];
  sizes: Size[];
  prosperityLevels: ProsperityLevel[];
};

export default function Home(props: Props) {
  const [generatedNameInput, setGeneratedNameInput] = useState('');
  const [generatedNameResult, setGeneratedNameResult] = useState();
  const [retrievedNameResult, setRetrievedNameResult] = useState();
  const [generatedBackstoryResult, setGeneratedBackstoryResult] = useState();
  const [generatedBackstoryInput, setGeneratedBackstoryInput] = useState('');

  async function nameGeneratorSubmit(event) {
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
    setGeneratedNameInput('');
  }

  async function nameRetrieverSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/names', {
      method: 'GET',
    });
    const data = await response.json();
    setRetrievedNameResult(data);
  }

  async function backstoryGeneratorSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/backstories/generate-backstory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: generatedBackstoryInput }),
    });
    const data = await response.json();
    setGeneratedBackstoryResult(data.result);
    setGeneratedBackstoryInput('');
  }

  return (
    <>
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
              name="animal"
              placeholder="Enter a theme, e.g. 'dwarven', 'smelly', 'powerful'"
              value={generatedNameInput}
              onChange={(e) => setGeneratedNameInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          <div className={styles.result}>{generatedNameResult}</div>

          <h3>Internal database name generator</h3>
          <form onSubmit={nameRetrieverSubmit}>
            <input type="submit" value="Generate names" />
          </form>
          <div className={styles.result}>{retrievedNameResult}</div>

          <h3>External API backstory generator</h3>
          <form onSubmit={backstoryGeneratorSubmit}>
            <select>
              {props.characterClasses.map((characterClass: CharacterClass) => (
                <option key={characterClass.id}>{characterClass.name}</option>
              ))}
            </select>
            <select>
              {props.origins.map((origins: Origin) => (
                <option key={origins.id}>{origins.name}</option>
              ))}
            </select>

            <input
              name="animal"
              placeholder="Elvish Wizard named Elf Wizardson"
              value={generatedBackstoryInput}
              onChange={(e) => setGeneratedBackstoryInput(e.target.value)}
            />
            <input type="submit" value="Generate backstory" />
          </form>
          <div className={styles.result}>{generatedBackstoryResult}</div>
        </main>
      </div>
      <div>test</div>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const characterClasses = await getCharacterClasses();
  const origins = await getOrigins();
  const sizes = await getSizes();
  const prosperityLevels = await getProsperityLevels();

  return {
    props: {
      characterClasses: characterClasses,
      origins: origins,
      sizes: sizes,
      prosperityLevels: prosperityLevels,
    },
  };
}
