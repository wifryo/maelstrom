import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../database/sessions';
import { getRandomSettlement } from '../../database/settlements';

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
    const settlement = await getRandomSettlement();
    return response.status(200).json(settlement);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
