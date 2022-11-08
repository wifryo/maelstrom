import { sql } from './connect';

export type FirstName = {
  id: number;
  firstName: string;
};

export async function getFirstNames() {
  const firstNames = await sql<FirstName[]>`
  SELECT * FROM first_names
  `;
  return firstNames;
}
