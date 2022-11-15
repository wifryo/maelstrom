import { sql } from './connect';

export type Settlement = {
  id: number;
  size_id: number;
  prosperity_id: number;
  origin_id: number;
  description: string;
  verified: boolean;
};

export async function getRandomSettlement() {
  const settlement = await sql<Settlement[]>`
  SELECT * FROM settlements
  ORDER BY RANDOM()
  LIMIT 1`;
  return settlement;
}
