import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../database/sessions';
import { getRandomSettlement, getSettlement } from '../../database/settlements';

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
    const settlement = await getRandomSettlement();
    return response.status(200).json(settlement);
  }

  // POST returns settlement by size/species/prosperity
  if (request.method === 'POST') {
    if (
      request.body.sizeId &&
      request.body.speciesId &&
      request.body.prosperityId
    ) {
      const retrievedSettlement = await getSettlement(
        request.body.sizeId,
        request.body.speciesId,
        request.body.prosperityId,
      );
      return response.status(200).json(retrievedSettlement);
    }
    return response.status(400).json({ message: 'Invalid parameters' });
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
