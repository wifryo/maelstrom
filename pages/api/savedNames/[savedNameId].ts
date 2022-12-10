import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSavedNameById } from '../../../database/names';
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

  if (request.method === 'DELETE') {
    const savedNameId = Number(request.query.savedNameId);
    const deletedSavedName = await deleteSavedNameById(
      savedNameId,
      request.cookies.sessionToken,
    );
    if (!deletedSavedName) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }
    console.log(deletedSavedName);
    return response.status(200).json(deletedSavedName);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
