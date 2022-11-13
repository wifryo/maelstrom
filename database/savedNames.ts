import { sql } from './connect';
import { FirstName, LastName } from './names';

export type SavedName = {
  id: number | null;
  userId: number;
  firstNameId: number;
  lastNameId: number;
};

// Create new saved name
/* export async function createSavedNameById(
  nameToSave: SavedName,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedName] = await sql<SavedName[]>`
    INSERT INTO saved_names
      (user_id, first_name_id, last_name_id)
    VALUES
      (${nameToSave.user_id}, ${nameToSave.first_name_id}, ${nameToSave.last_name_id})
    RETURNING *
    `;
  return savedName;
} */

export async function createSavedNameById(
  nameToSave: SavedName,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedName] = await sql<SavedName[]>`
    INSERT INTO saved_names
      (user_id, first_name_id, last_name_id)
    VALUES
      (${nameToSave.userId}, ${nameToSave.firstNameId}, ${nameToSave.lastNameId})
    RETURNING *
    `;
  return savedName;
}

// Get all saved names by user id, if logged in
export async function getSavedNamesByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const firstNames = await sql<FirstName[]>`
    SELECT
      first_names.id AS first_name_id,
      first_names.first_name AS first_name
    FROM
      first_names,
      saved_names
    WHERE
      saved_names.user_id = ${id} AND
      first_names.id = saved_names.first_name_id
    `;
  const lastNames = await sql<LastName[]>`
    SELECT
      last_names.id AS last_name_id,
      last_names.last_name AS last_name
    FROM
      last_names,
      saved_names
    WHERE
      saved_names.user_id = ${id} AND
      last_names.id = saved_names.last_name_id
    `;
  return [firstNames, lastNames];
}

export async function deleteSavedNameById(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedName] = await sql<SavedName[]>`
    SELECT

    `;
  return savedName;
}
