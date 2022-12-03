import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getValidSessionByToken } from '../database/sessions';
import { RegisterResponseBody } from './api/register';

type Props = {
  refreshUserProfile: () => Promise<void>;
};

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.toLowerCase(),
        password,
      }),
    });
    const registerResponseBody =
      (await registerResponse.json()) as RegisterResponseBody;

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return console.log(registerResponseBody.errors);
    }

    const returnTo = router.query.returnTo;
    if (
      returnTo &&
      !Array.isArray(returnTo) && // Security: Validate returnTo parameter against valid path
      // (because this is untrusted user input)
      /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
    ) {
      return await router.push(returnTo);
    }

    // refresh the user on state
    await props.refreshUserProfile();
    // redirect user to user profile
    await router.push(`/generators`);
  }

  return (
    <>
      <Head>
        <title>Tapestry: register</title>
        <meta name="description" content="Register new users" />
      </Head>
      {errors.map((error) => {
        return (
          <p
            css={css`
              background-color: red;
              color: white;
              padding: 5px;
            `}
            key={error.message}
          >
            ERROR: {error.message}
          </p>
        );
      })}
      <Box
        sx={{
          width: { xs: '100%', sm: '400px' },
        }}
        margin="auto"
      >
        <FormGroup>
          <Typography mb="1rem" variant="h2">
            Register
          </Typography>

          <InputLabel
            htmlFor="register-username"
            sx={{ sm: { mt: '2rem' }, xs: { mt: '1rem' }, color: '#000' }}
          >
            Username*
          </InputLabel>
          <Paper elevation={0}>
            <TextField
              fullWidth
              id="register-username"
              variant="outlined"
              color="primary"
              margin="none"
              size="small"
              value={username}
              onChange={(event) => {
                setUsername(event.currentTarget.value);
              }}
              required
            />
          </Paper>
          <InputLabel
            sx={{ mt: '1rem', color: '#000' }}
            htmlFor="login-password"
          >
            Password*
          </InputLabel>
          <Paper elevation={0}>
            <TextField
              fullWidth
              type="password"
              id="login-password"
              variant="outlined"
              margin="none"
              color="primary"
              size="small"
              value={password}
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              required
            />
          </Paper>
          <Button
            sx={{ m: 'auto', mt: '2rem', mb: '2rem', width: '200px' }}
            color="primary"
            variant="contained"
            disableElevation
            onClick={async () => {
              await registerHandler();
            }}
          >
            Register
          </Button>
        </FormGroup>
      </Box>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/generators',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}
