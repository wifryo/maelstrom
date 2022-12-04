import { Backstory, SavedBackstoryContent } from './backstories';
import { sql } from './connect';

export async function getAllBackstoriesByValidSessionToken(
  token: string | undefined,
) {
  if (!token) return undefined;
  const backstories = await sql<Backstory[]>`
    SELECT * FROM backstories
    `;
  const backstoriesContent = await sql<SavedBackstoryContent[]>`
   SELECT
     backstories.id AS id,
     classes.name AS class,
     origins.name AS origin,
     first_names.first_name AS first_name,
     last_names.last_name AS last_name,
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
     backstories.id > 0 AND
     backstories.class_id = classes.id AND
     backstories.origin_id = origins.id AND
     backstories.first_name_id = first_names.id AND
     backstories.last_name_id = last_names.id
   `;
  return {
    backstories: backstories,
    backstoriesContent: backstoriesContent,
  };
}
