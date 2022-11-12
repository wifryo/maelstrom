import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSavedNameById,
  deleteSavedNameById,
  getSavedNamesByIdAndValidSessionToken,
  SavedName,
} from '../../../../database/savedNames';
import { getValidSessionByToken } from '../../../../database/sessions';

// POST adds name to user's profile

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

  // TODO: check if the id matches current user
  /* if (!animalId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  } */

  //TODO: get saved names
  /*   if (request.method === 'GET') {
    // no validation example
    // const animal = await getAnimalById(animalId);

    // TODO add an example of a query that requires session token validation
    const animal = await getSavedNamesByIdAndValidSessionToken();

    // check if animal exists on the database
    if (!animal) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(animal);
  } */

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

  // TODO: delete saved name
  /* if (request.method === 'DELETE') {
    const deletedAnimal = await deleteAnimalById(animalId);

    if (!deletedAnimal) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    console.log(deletedAnimal);

    return response.status(200).json(deletedAnimal);
  } */

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
