import { sql } from './connect';

export type Settlement = {
  id: number | null;
  sizeId: number;
  prosperityId: number;
  originId: number;
  description: string;
  verified: boolean;
};

export type SavedSettlement = {
  id: number | null;
  userId: number;
  settlementId: number;
};

export type SavedSettlementContent = {
  id: number;
  size: string;
  prosperity: string;
  origin: string;
  description: string;
  verified: boolean;
};

export async function getRandomSettlement() {
  const settlement = await sql<Settlement[]>`
  SELECT * FROM settlements
  ORDER BY RANDOM()
  LIMIT 1`;
  return settlement[0];
}

export async function getSettlement(
  sizeId: string,
  originId: string,
  prosperityId: string,
) {
  const settlement = await sql<Settlement[]>`
  SELECT * FROM settlements
  WHERE
    settlements.size_id = ${sizeId} AND
    settlements.origin_id = ${originId} AND
    settlements.prosperity_level_id = ${prosperityId}
  ORDER BY RANDOM()
  LIMIT 1`;
  return settlement[0];
}

export async function createSettlement(
  settlementToCreate: Settlement,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedSettlement] = await sql<SavedSettlement[]>`
    INSERT INTO settlements
      (size_id, prosperity_level_id, origin_id, description, verified)
    VALUES
      (${settlementToCreate.sizeId}, ${settlementToCreate.prosperityId}, ${settlementToCreate.originId}, ${settlementToCreate.description}, ${settlementToCreate.verified})
    RETURNING *
    `;
  return savedSettlement;
}

export async function createSavedSettlementById(
  settlementToSave: SavedSettlement,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedSettlement] = await sql<SavedSettlement[]>`
    INSERT INTO saved_settlements
      (user_id, settlement_id)
    VALUES
      (${settlementToSave.userId}, ${settlementToSave.settlementId})
    RETURNING *
    `;
  return savedSettlement;
}

export async function getSavedSettlementContentByUserIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const savedSettlements = await sql<SavedSettlementContent[]>`
    SELECT
      saved_settlements.id AS id,
      sizes.name AS size,
      prosperity_levels.name AS prosperity,
      origins.name AS origin,
      settlements.description AS description,
      settlements.verified AS verified
    FROM
      settlements,
      saved_settlements,
      origins,
      sizes,
      prosperity_levels
    WHERE
      saved_settlements.user_id = ${id} AND
      saved_settlements.settlement_id = settlements.id AND
      settlements.size_id = sizes.id AND
      settlements.prosperity_level_id = prosperity_levels.id AND
      settlements.origin_id = origins.id
    `;
  return [savedSettlements];
}

export async function deleteSavedSettlementById(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  const [savedSettlement] = await sql<SavedSettlement[]>`
    DELETE FROM
      saved_settlements
    WHERE
      id = ${id}
    RETURNING *
    `;
  return savedSettlement;
}
