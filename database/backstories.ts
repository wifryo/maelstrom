import { sql } from './connect';

export type Backstory = {
  id: number;
  class_id: number;
  origin_id: number;
  last_name_id: number;
  first_name_id: number;
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
