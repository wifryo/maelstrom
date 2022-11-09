import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import {
  FirstName,
  getFirstNames,
  getLastNames,
  LastName,
} from '../database/names';
import styles from './index.module.css';

type Props = {
  firstNames: FirstName[];
  lastNames: LastName[];
};

export default function Home(props: Props) {
  const [generatedNameInput, setGeneratedNameInput] = useState('');
  const [generatedNameResult, setGeneratedNameResult] = useState();
  const [retrievedNameResult, setRetrievedNameResult] = useState();

  async function nameGeneratorSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generateName', {
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
        </main>
      </div>

      {props.firstNames.map((firstName: FirstName) => {
        return <div key={firstName.id}>name: {firstName.firstName}</div>;
      })}
      {props.lastNames.map((lastName: LastName) => {
        return <div key={lastName.id}>name: {lastName.lastName}</div>;
      })}
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const firstNames = await getFirstNames();
  const lastNames = await getLastNames();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Animals` page component above
    props: {
      // First prop, containing all animals
      firstNames: firstNames,
      lastNames: lastNames,
      // Second prop, example
      // abc: 123,
    },
  };
}
