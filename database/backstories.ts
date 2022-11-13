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

// todo: this does not work
export async function getRandomBackstory() {
  const backstory = await sql<Backstory[]>`
  SELECT * FROM backstories
  ORDER BY RANDOM()
  LIMIT 1`;
  if (backstory[0]) {
    return backstory;
  }
}
