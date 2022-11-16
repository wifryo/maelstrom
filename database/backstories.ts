import { sql } from './connect';

export type Backstory = {
  id: number;
  classId: number;
  originId: number;
  firstNameId: number;
  lastNameId: number;
  backstory: string;
  verified: boolean;
};

export type SavedBackstory = {
  id: number | null;
  userId: number;
  backstoryId: number;
};

export type SavedBackstoryContent = {
  id: number;
  class: string;
  origin: string;
  firstName: string;
  lastName: string;
  backstory: string;
  verified: boolean;
};

export async function getRandomBackstory() {
  const backstory = await sql<Backstory[]>`
  SELECT * FROM backstories
  ORDER BY RANDOM()
  LIMIT 1`;

  return backstory;
}

export async function createSavedBackstoryById(
  backstoryToSave: SavedBackstory,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedBackstory] = await sql<SavedBackstory[]>`
    INSERT INTO saved_backstories
      (user_id, backstory_id)
    VALUES
      (${backstoryToSave.userId}, ${backstoryToSave.backstoryId})
    RETURNING *
    `;
  return savedBackstory;
}

export async function getSavedBackstoryContentByUserIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const savedBackstories = await sql<SavedBackstoryContent[]>`
    SELECT
      backstories.id AS id,
      classes.name AS class,
      origins.name AS origin,
      first_names.first_name AS firstName,
      last_names.last_name AS lastName,
      backstories.backstory AS backstory,
      backstories.verified AS verified
    FROM
      backstories,
      saved_backstories,
      classes,
      origins,
      first_names,
      last_names
    WHERE
      saved_backstories.user_id = ${id} AND
      saved_backstories.backstory_id = backstories.id AND
      backstories.class_id = classes.id AND
      backstories.origin_id = origins.id AND
      backstories.first_name_id = first_names.id AND
      backstories.last_name_id = last_names.id
    `;
  return [savedBackstories];
}

export async function deleteSavedBackstoryById(
  id: number,
  token: string | undefined,
) {
  console.log('attempting delete');
  console.log(`id: ${id}`);
  if (!token) return undefined;
  const [savedBackstory] = await sql<SavedBackstory[]>`
    DELETE FROM
      saved_backstories
    WHERE
      id = ${id}
    RETURNING *
    `;
  console.log(savedBackstory);
  return savedBackstory;
}
