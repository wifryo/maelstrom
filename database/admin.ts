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
   SELECT DISTINCT
     backstories.id AS id,
     classes.name AS class,
     species.name AS species,
     backstories.description AS description,
     backstories.verified AS verified
   FROM
     backstories,
     classes,
     species,
     names
   WHERE
     backstories.class_id = classes.id AND
     backstories.species_id = species.id
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
  const names = await sql<Name[]>`
    SELECT * FROM names
    `;
  return {
    names: names,
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
    prosperities.name AS prosperity,
    species.name AS species,
    settlements.description AS description,
    settlements.verified AS verified
  FROM
    settlements,
    species,
    sizes,
    prosperities
  WHERE
    settlements.size_id = sizes.id AND
    settlements.prosperity_id = prosperities.id AND
    settlements.species_id = species.id
  `;

  return {
    settlements: settlements,
    settlementsContent: settlementsContent,
  };
}
