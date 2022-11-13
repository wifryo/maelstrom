import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
};

async function getSavedNames(event: React.SyntheticEvent, id: number) {
  event.preventDefault();
  const response = await fetch(`/api/users/names/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
}

export default function UserProfile(props: Props) {
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
      BLUNCTIONAL
      <br />
      <button onClick={(event) => getSavedNames(event, props.user.id)}>
        getSavedNames
      </button>
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
