import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSavedNameById,
  getSavedNamesByIdAndValidSessionToken,
  SavedName,
} from '../../../../database/savedNames';
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

  const userId = Number(request.query.userId);

  // GET retrieves saved names
  if (request.method === 'GET') {
    const savedNames = await getSavedNamesByIdAndValidSessionToken(
      userId,
      session.token,
    );

    if (!savedNames) {
      return response
        .status(404)
        .json({ message: 'No saved names or invalid session token' });
    }

    return response.status(200).json(savedNames);
  }

  // POST adds name to user's profile
  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    const nameToSave: SavedName = {
      id: null,
      userId: request.body?.userId,
      firstNameId: request.body?.firstNameId,
      lastNameId: request.body?.lastNameId,
    };

    // Check all the information to create the saved name exists
    if (
      !(nameToSave.userId && nameToSave.firstNameId && nameToSave.lastNameId)
    ) {
      return response
        .status(400)
        .json({ message: 'property or type missing from post request' });
    }

    // Create the saved name using the database util function
    const newSavedName = await createSavedNameById(
      nameToSave,
      request.cookies.sessionToken,
    );

    // Response with the newly created saved name
    return response.status(200).json(newSavedName);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
