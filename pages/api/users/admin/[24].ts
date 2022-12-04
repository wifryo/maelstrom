import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBackstoriesByValidSessionToken } from '../../../../database/admin';
import { getValidSessionByToken } from '../../../../database/sessions';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  // Retrieve all names, backstories, settlements
  if (request.method === 'GET') {
    const backstory = await getAllBackstoriesByValidSessionToken(session.token);
    return response.status(200).json(backstory);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
