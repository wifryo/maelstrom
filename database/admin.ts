import { Backstory, SavedBackstoryContent } from './backstories';
import { sql } from './connect';
import { Name } from './names';
import { SavedSettlementContent, Settlement } from './settlements';

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
     classes,
     origins,
     first_names,
     last_names
   WHERE
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

export async function getAllNamesByValidSessionToken(
  token: string | undefined,
) {
  if (!token) return undefined;
  const firstNames = await sql<FirstName[]>`
    SELECT * FROM first_names
    `;
  const lastNames = await sql<LastName[]>`
    SELECT * FROM last_names
    `;

  return {
    firstNames: firstNames,
    lastNames: lastNames,
  };
}

export async function getAllSettlementsByValidSessionToken(
  token: string | undefined,
) {
  if (!token) return undefined;
  const settlements = await sql<Settlement[]>`
    SELECT * FROM settlements
    `;
  const settlementsContent = await sql<SavedSettlementContent[]>`
  SELECT
    settlements.id AS id,
    sizes.name AS size,
    prosperity_levels.name AS prosperity,
    origins.name AS origin,
    settlements.description AS description,
    settlements.verified AS verified
  FROM
    settlements,
    origins,
    sizes,
    prosperity_levels
  WHERE
    settlements.size_id = sizes.id AND
    settlements.prosperity_level_id = prosperity_levels.id AND
    settlements.origin_id = origins.id
  `;

  return {
    settlements: settlements,
    settlementsContent: settlementsContent,
  };
}
