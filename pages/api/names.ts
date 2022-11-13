import { NextApiRequest, NextApiResponse } from 'next';
import {
  FullName,
  getRandomFirstName,
  getRandomLastName,
} from '../../database/names';
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
    const firstName = await getRandomFirstName();
    const lastName = await getRandomLastName();
    const fullName: FullName = {
      firstNameId: firstName?.id,
      lastNameId: lastName?.id,
      firstName: firstName?.firstName,
      lastName: lastName?.lastName,
    };
    return response.status(200).json(fullName);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
