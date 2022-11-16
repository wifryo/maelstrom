import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSavedNameById,
  deleteSavedNameById,
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

  // TODO: edit saved names
  /* if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
    const firstName = request.body?.firstName;
    const accessory = request.body?.accessory;
    const type = request.body?.type;

    // Check all the information to create the animal exists
    if (!(firstName && accessory && type)) {
      return response
        .status(400)
        .json({ message: 'property firstName, accessory or type missing' });
    }

    // TODO: add type checking to the api

    // Create the animal using the database util function
    const newAnimal = await updateAnimalById(
      animalId,
      firstName,
      type,
      accessory,
    );

    if (!newAnimal) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created animal
    return response.status(200).json(newAnimal);
  } */

  // moved to /api/savedNames/[savedNameId].ts
  /* if (request.method === 'DELETE') {
    const savedNameId = Number(request.query.savedNameId);
    console.log('savednameID:');
    console.log(savedNameId);
    const deletedSavedName = await deleteSavedNameById(
      savedNameId,
      request.cookies.sessionToken,
    );
    if (!deletedSavedName) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }
    console.log(deletedSavedName);
    return response.status(200).json(deletedSavedName);
  } */

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
