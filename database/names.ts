import { join } from 'path';
import { sql } from './connect';

export type Name = {
  id: number;
  name: string;
  first_name: boolean;
  last_name: boolean;
};

export type FullName = {
  firstNameId: number;
  firstName: string;
  lastNameId: number;
  lastName: string;
};

export type SavedName = {
  id: number | null;
  userId: number;
  firstNameId: number;
  lastNameId: number;
};

export type FullSavedName = {
  id: number;
  firstNameId: number;
  firstName: string;
  lastNameId: number;
  lastName: string;
};

export async function getRandomFirstName() {
  const firstName = await sql<Name[]>`
  SELECT * FROM names
  WHERE first_name = true
  ORDER BY RANDOM()
  LIMIT 1`;
  return firstName[0];
}

export async function getRandomLastName() {
  const lastName = await sql<Name[]>`
  SELECT * FROM names
  WHERE last_name = true
  ORDER BY RANDOM()
  LIMIT 1`;
  return lastName[0];
}

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

export function merge(array1: any, array2: any) {
  const array3 = [{}];
  for (let i = 0; i < array1.length; i++) {
    array3[i] = { ...array1[i], ...array2[i] };
  }
  return array3;
}

export async function getSavedNamesByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const fullSavedFirstNames = await sql<FullSavedName[]>`
  SELECT
    saved_names.id AS id,
    names.id AS first_name_id,
    names.name AS first_name
  FROM
    saved_names
  INNER JOIN
    names ON (
      saved_names.user_id = ${id} AND
      names.id = saved_names.first_name_id
    )
  `;
  const fullSavedLastNames = await sql<FullSavedName[]>`
  SELECT
    saved_names.id AS id,
    names.id AS last_name_id,
    names.name AS last_name
  FROM
    saved_names
  INNER JOIN
    names ON (
      saved_names.user_id = ${id} AND
      names.id = saved_names.last_name_id
    )
  `;
  const fullSavedNames = await merge(fullSavedFirstNames, fullSavedLastNames);
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
