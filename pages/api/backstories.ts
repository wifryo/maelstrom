import { NextApiRequest, NextApiResponse } from 'next';
import { getBackstory, getRandomBackstory } from '../../database/backstories';
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
  // GET returns random backstory
  if (request.method === 'GET') {
    const backstory = await getRandomBackstory();
    return response.status(200).json(backstory);
  }

  // POST returns backstory by origin/class
  if (request.method === 'POST') {
    if (request.body.characterClassId && request.body.originId) {
      const retrievedBackstory = await getBackstory(
        request.body.characterClassId,
        request.body.originId,
      );
      console.log('retrieved backstory to aPI');
      console.log(retrievedBackstory);
      return response.status(200).json(retrievedBackstory);
    }
    return response.status(400).json({ message: 'Invalid parameters' });
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
