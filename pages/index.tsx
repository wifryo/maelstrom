import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { FirstName, getFirstNames } from '../database/names';
import styles from './index.module.css';

type Props = {
  firstNames: FirstName[];
};

export default function Home(props: Props) {
  const [animalInput, setAnimalInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput('');
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
          <h3>Name generator</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter a theme, e.g. 'dwarven', 'smelly', 'powerful'"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <input type="submit" value="Generate names" />
          </form>
          <div className={styles.result}>{result}</div>
        </main>
      </div>

      {props.firstNames.map((firstName: FirstName) => {
        return <div key={firstName.id}>name: {firstName.firstName}</div>;
      })}
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const firstNames = await getFirstNames();
  return {
    // Anything that you write in this props object
    // will become the props that are passed to
    // the `Animals` page component above
    props: {
      // First prop, containing all animals
      firstNames: firstNames,
      // Second prop, example
      // abc: 123,
    },
  };
}
