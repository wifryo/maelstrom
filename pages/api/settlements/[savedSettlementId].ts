import { NextApiRequest, NextApiResponse } from 'next';
import { getValidSessionByToken } from '../../../database/sessions';
import { deleteSavedSettlementById } from '../../../database/settlements';

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

  // DELETE removes saved settlement record in join table
  if (request.method === 'DELETE') {
    const savedSettlementId = Number(request.query.savedSettlementId);

    const deletedSavedSettlement = await deleteSavedSettlementById(
      savedSettlementId,
      request.cookies.sessionToken,
    );
    if (!deletedSavedSettlement) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }
    console.log(deletedSavedSettlement);
    return response.status(200).json(deletedSavedSettlement);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
