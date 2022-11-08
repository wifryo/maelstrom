import { NextApiRequest, NextApiResponse } from 'next';
import { getFirstNames } from '../../database/names';
import { getValidSessionByToken } from '../../database/sessions';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'GET') {
    const firstNames = await getFirstNames();
    return response.status(200).json(firstNames);
  }

  /* if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const firstName = request.body?.firstName;
    const accessory = request.body?.accessory;
    const type = request.body?.type;
    const csrfToken = request.body?.csrfToken;

    if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
      return response.status(401).json({ message: 'csrf_token is not valid' });
    }

    // Check all the information to create the animal exists
    if (!(firstName && accessory && type)) {
      return response
        .status(400)
        .json({ message: 'property firstName, accessory or type missing' });
    }

    // TODO: add type checking to the api

    // Create the animal using the database util function
    const newAnimal = await createAnimal(firstName, type, accessory);

    // response with the new created animal
    return response.status(200).json(newAnimal);
  } */

  return response.status(400).json({ message: 'Method Not Allowed' });
}
