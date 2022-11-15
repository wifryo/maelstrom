import { sql } from './connect';

export type FirstName = {
  id: number;
  firstName: string;
};

export type LastName = {
  id: number;
  lastName: string;
};

export type FullName = {
  firstNameId: number;
  firstName: string;
  lastNameId: number;
  lastName: string;
};

export type FullSavedName = {
  id: number;
  firstNameId: number;
  firstName: string;
  lastNameId: number;
  lastName: string;
};

export async function getRandomFirstName() {
  const firstName = await sql<FirstName[]>`
  SELECT * FROM first_names
  ORDER BY RANDOM()
  LIMIT 1`;
  return firstName[0];
}

export async function getRandomLastName() {
  const lastName = await sql<LastName[]>`
  SELECT * FROM last_names
  ORDER BY RANDOM()
  LIMIT 1`;
  return lastName[0];
}
