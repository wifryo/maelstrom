import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { SavedBackstoryContent } from '../database/backstories';
import { FullSavedName } from '../database/names';
import { getUserBySessionToken, User } from '../database/users';

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
    setRetrievedSavedBackstories(savedBackstories[0]);
  }

  async function deleteSavedBackstory(id: number) {
    const response = await fetch(`/api/backstories/${id}`, {
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
    <>
      <Head>
        <title>Personal Information</title>
        <meta name="description" content="Biography of the person" />
      </Head>
      <h1>Personal Information</h1>
      id: {props.user.id} username: {props.user.username} remaining credits:
      {props.user.credits}
      <hr />
      <h2>Saved Names</h2>
      <br />
      {retrievedSavedNames.map((fullSavedName: FullSavedName) => {
        return (
          <Fragment
            key={`${fullSavedName.firstNameId}_${fullSavedName.lastNameId}`}
          >
            <div>
              {fullSavedName.id} {fullSavedName.firstName}{' '}
              {fullSavedName.lastName}
            </div>
            <button onClick={() => deleteSavedName(fullSavedName.id)}>
              Delete
            </button>
          </Fragment>
        );
      })}
      <h2>Saved Backstories</h2>
      <br />
      {retrievedSavedBackstories.map(
        (savedBackstoryContent: SavedBackstoryContent) => {
          return (
            <Fragment key={savedBackstoryContent.id}>
              <div>{savedBackstoryContent.backstory}</div>
              <button
                onClick={() => deleteSavedBackstory(savedBackstoryContent.id)}
              >
                Delete
              </button>
            </Fragment>
          );
        },
      )}
      {/* <h2>Saved Settlements</h2>
      <br />
      {retrievedSavedSettlements.map(
        (savedSettlementContent: SavedSettlementContent) => {
          return (
            <Fragment key={savedSettlementContent.id}>
              <div>{savedSettlementContent.settlement}</div>
              <button
                onClick={() => deleteSavedSettlement(savedSettlementContent.id)}
              >
                Delete
              </button>
            </Fragment>
          );
        },
      )} */}
    </>
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
