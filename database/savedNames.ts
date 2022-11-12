import { sql } from './connect';
import { FullName } from './names';

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
  const [savedName] = await sql<SavedName[]>`
    SELECT

    `;
  return savedName;
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
