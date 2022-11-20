import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSavedBackstoryById,
  getSavedBackstoryContentByUserIdAndValidSessionToken,
  SavedBackstory,
} from '../../../../database/backstories';
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

  // GET retrieves saved backstories
  if (request.method === 'GET') {
    const savedBackstories =
      await getSavedBackstoryContentByUserIdAndValidSessionToken(
        userId,
        session.token,
      );

    if (!savedBackstories) {
      return response
        .status(404)
        .json({ message: 'No saved backstories or invalid session token' });
    }

    return response.status(200).json(savedBackstories[0]);
  }

  // POST creates new saved backstory entry
  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    const backstoryToSave: SavedBackstory = {
      id: null,
      userId: request.body?.userId,
      backstoryId: request.body?.backstoryId,
    };

    // Check all the information to create the saved backstory exists
    if (!(backstoryToSave.userId && backstoryToSave.backstoryId)) {
      return response
        .status(400)
        .json({ message: 'property or type missing from post request' });
    }

    // Create the saved backstory using the database util function
    const newSavedBackstory = await createSavedBackstoryById(
      backstoryToSave,
      request.cookies.sessionToken,
    );

    // Response with the newly created saved backstory
    return response.status(200).json(newSavedBackstory);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
