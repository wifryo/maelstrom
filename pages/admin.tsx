import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Configuration, OpenAIApi } from 'openai';
import { getUserBySessionToken, User } from '../database/users';

type Props = {
  user?: User;
};

async function uploadTrainingData() {
  console.log('hallo');
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createFineTune({
    training_file: 'trainingdata.jsonl',
  });
  console.log(response);
}

export default function Admin(props: Props) {
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
        <title>AI Fine tuning upload</title>
        <meta name="description" content="ai fine tuning upload" />
      </Head>
      <h1>Upload</h1>
      <button onClick={uploadTrainingData}>Upload</button>
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
