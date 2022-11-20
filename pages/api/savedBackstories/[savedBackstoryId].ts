import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSavedBackstoryById } from '../../../database/backstories';
import { getValidSessionByToken } from '../../../database/sessions';

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

  // DELETE removes saved backstory record in join table
  if (request.method === 'DELETE') {
    console.log(`id: ${request.query.savedBackstoryId}`);
    const savedBackstoryId = Number(request.query.savedBackstoryId);
    const deletedSavedBackstory = await deleteSavedBackstoryById(
      savedBackstoryId,
      request.cookies.sessionToken,
    );
    if (!deletedSavedBackstory) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }
    return response.status(200).json(deletedSavedBackstory);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
