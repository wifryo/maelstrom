import { sql } from './connect';
import { FirstName, FullName } from './names';

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
  const fullNames = await sql<FullName[]>`
    SELECT
      first_names.id as first_name_id,
      last_names.id as last_name_id,
      first_names.first_name as first_name,
      last_names.last_name as last_name_id
    FROM
      last_names,
      first_names
    INNER JOIN
      saved_names ON first_names.id = saved_names.first_name_id
    INNER JOIN
      saved_names ON last_names.id = saved_names.last_name_id
    WHERE
      saved_names.user_id = ${id}
    `;
  console.log(fullNames);
  return fullNames;
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
