import { sql } from './connect';
import { FullSavedName } from './names';

export type SavedName = {
  id: number | null;
  userId: number;
  firstNameId: number;
  lastNameId: number;
};

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

export async function getSavedNamesByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const fullSavedNames = await sql<FullSavedName[]>`
    SELECT
      saved_names.id AS id,
      first_names.id AS first_name_id,
      first_names.first_name AS first_name,
      last_names.id AS last_name_id,
      last_names.last_name AS last_name
    FROM
      first_names,
      last_names,
      saved_names
    WHERE
      saved_names.user_id = ${id} AND
      first_names.id = saved_names.first_name_id AND
      last_names.id = saved_names.last_name_id
    `;
  return [fullSavedNames];
}

export async function deleteSavedNameById(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedName] = await sql<SavedName[]>`
    DELETE FROM
      saved_names
    WHERE
      id = ${id}
    RETURNING *
    `;
  return savedName;
}
