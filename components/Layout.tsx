import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { User } from '../database/users';
import Header from './Header';

const mainStyles = css`
  min-height: 100vh;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 5rem;
`;

type Props = {
  user?: User;
};

type ChildrenProps = {
  children: JSX.Element;
};

export default function Layout(props: Props & ChildrenProps) {
  const router = useRouter();
  const preventHeaderRender = router.pathname === '/' ? false : true;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {preventHeaderRender && <Header user={props.user} />}

      <main css={mainStyles}>{props.children}</main>
    </>
  );
}
