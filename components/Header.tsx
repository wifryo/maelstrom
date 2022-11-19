import { css } from '@emotion/react';
import Link from 'next/link';
import { User } from '../database/users';

const navigationStyles = css`
  width: 100%;
  height: 3rem;
  background-color: #f9e6c4;
  color: #000000;
  position: fixed;
  z-index: 1;
  padding: 0 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: solid;
  border-color: #000000;
  border-width: 1px;

  > div {
    align-self: center;
  }

  > div > a {
    text-decoration: none;
    color: #000000;
    margin: 0 1rem 0 1rem;
  }
`;

const authenticationStyles = css`
  position: relative;
  display: block;
  cursor: pointer;
  :hover > div {
    display: block;
  }
`;

type Props = {
  user?: User;
};

function Anchor({ children, ...restProps }: any) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props: Props) {
  return (
    <header>
      <nav css={navigationStyles}>
        <div>
          <Link href="/generators">
            <a data-test-id="generators">generators</a>
          </Link>
          <Link href="/about">
            <a data-test-id="about">about</a>
          </Link>
          <Link href="/private-profile">
            <a data-test-id="profile">profile</a>
          </Link>
        </div>

        <div css={authenticationStyles}>
          {props.user && props.user.username}
          {props.user ? (
            <Anchor
              css={css`
                margin-left: 10px;
              `}
              href="/logout"
            >
              logout
            </Anchor>
          ) : (
            <>
              <Link href="/login">login</Link>
              <Link href="/register">register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
