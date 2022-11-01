import { css } from '@emotion/react';
import Link from 'next/link';

const navigationStyles = css`
  width: 100%;
  height: 3rem;
  background-color: #25201d;
  color: #faf9f7;
  position: fixed;
  z-index: 1;
  padding: 0 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: flex-start;
  border-bottom: solid;
  border-color: #faf9f7;
  border-width: 1px;

  > div {
    align-self: center;
  }

  > div > a {
    text-decoration: none;
    color: #faf9f7;
    margin: 0 1rem 0 1rem;
  }
`;

const logoStyles = css`
  justify-self: center;
`;

const authenticationStyles = css`
  position: relative;
  display: block;
  cursor: pointer;

  :hover > div {
    display: block;
  }
`;

export default function Header() {
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
        </div>
        <div css={logoStyles}>tapestry</div>
        <div css={authenticationStyles}>
          <Link href="/login">
            <a data-test-id="login">login</a>
          </Link>
          <Link href="/register">
            <a data-test-id="register">register</a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
