import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login new users" />
      </Head>
      <h1>Login</h1>

      <label>
        username
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.currentTarget.value.toLowerCase());
          }}
        />
      </label>
      <br />
      <label>
        password
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </label>
      <button>Login</button>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
