import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../../database/sessions';
import {
  createSavedSettlementById,
  getSavedSettlementContentByUserIdAndValidSessionToken,
  SavedSettlement,
} from '../../../../database/settlements';

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

  // GET retrieves saved settlements
  if (request.method === 'GET') {
    const savedSettlements =
      await getSavedSettlementContentByUserIdAndValidSessionToken(
        userId,
        session.token,
      );

    if (!savedSettlements) {
      return response
        .status(404)
        .json({ message: 'No saved settlements or invalid session token' });
    }

    return response.status(200).json(savedSettlements);
  }

  // POST creates new saved settlement entry
  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }
    const settlementToSave: SavedSettlement = {
      id: null,
      userId: request.body?.userId,
      settlementId: request.body?.settlementId,
    };

    // Check all the information to create the saved settlement exists
    if (!(settlementToSave.userId && settlementToSave.settlementId)) {
      return response
        .status(400)
        .json({ message: 'property or type missing from post request' });
    }

    // Create the saved settlement using the database util function
    const newSavedSettlement = await createSavedSettlementById(
      settlementToSave,
      request.cookies.sessionToken,
    );

    // Response with the newly created saved settlement
    return response.status(200).json(newSavedSettlement);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
