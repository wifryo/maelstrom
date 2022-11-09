// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSession } from '../../database/sessions';
import { createUser, getUserByUsername } from '../../database/users';
import { createSerialisedRegisterSessionTokenCookie } from '../../utils/cookies';

export type RegisterResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RegisterResponseBody>,
) {
  if (request.method === 'POST') {
    // 1. make sure the data exists
    if (
      typeof request.body.username !== 'string' ||
      typeof request.body.password !== 'string' ||
      !request.body.username ||
      !request.body.password
    ) {
      return response
        .status(400)
        .json({ errors: [{ message: 'username or password not provided' }] });
    }
    // 2. check if the user already exists
    const user = await getUserByUsername(request.body.username);

    if (user) {
      return response
        .status(401)
        .json({ errors: [{ message: 'username already exists' }] });
    }

    // 3. hash the password
    const passwordHash = await bcrypt.hash(request.body.password, 12);

    // 4. sql query to create the record
    const userWithoutPassword = await createUser(
      request.body.username,
      passwordHash,
      10,
    );

    // 5. create a session token and serialise a cookie with the token
    const session = await createSession(
      userWithoutPassword.id,
      crypto.randomBytes(80).toString('base64'),
    );

    const serialisedCookie = createSerialisedRegisterSessionTokenCookie(
      session.token,
    );

    response
      .status(200)
      .setHeader('Set-Cookie', serialisedCookie)
      .json({ user: { username: userWithoutPassword.username } });
  } else {
    response.status(401).json({ errors: [{ message: 'Method not allowed' }] });
  }
}
