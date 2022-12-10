import { sql } from './connect';

export type CharacterClass = {
  id: number;
  name: string;
};

export type Species = {
  id: number;
  name: string;
};

export type Size = {
  id: number;
  name: string;
};

export type Prosperity = {
  id: number;
  name: string;
};

export async function getCharacterClasses() {
  const characterClasses = await sql<CharacterClass[]>`
  SELECT * FROM classes
  `;
  return characterClasses;
}

export async function getSpecies() {
  const species = await sql<Species[]>`
  SELECT * FROM species
  `;
  return species;
}

export async function getSizes() {
  const sizes = await sql<Size[]>`
  SELECT * FROM sizes
  `;
  return sizes;
}

export async function getProsperities() {
  const prosperities = await sql<Prosperity[]>`
  SELECT * FROM prosperities
  `;
  return prosperities;
}
