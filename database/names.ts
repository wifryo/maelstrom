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
  lastNameId: number;
  firstName: string;
  lastName: string;
};

export async function getFirstNames() {
  const firstNames = await sql<FirstName[]>`
  SELECT * FROM first_names
  `;
  return firstNames;
}

export async function getLastNames() {
  const lastNames = await sql<LastName[]>`
  SELECT * FROM last_names
  `;
  return lastNames;
}

export async function getRandomName() {
  let fullName;
  const firstName = await sql<FirstName[]>`
  SELECT first_name FROM first_names
  ORDER BY RANDOM()
  LIMIT 1`;
  const lastName = await sql<LastName[]>`
  SELECT last_name FROM last_names
  ORDER BY RANDOM()
  LIMIT 1`;
  if (firstName[0] && lastName[0]) {
    fullName = `${firstName[0].firstName} ${lastName[0].lastName}`;
  }
  return fullName;
}
