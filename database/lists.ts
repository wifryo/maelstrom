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

export async function getOrigins() {
  const origins = await sql<Species[]>`
  SELECT * FROM origins
  `;
  return origins;
}

export async function getSizes() {
  const sizes = await sql<Size[]>`
  SELECT * FROM sizes
  `;
  return sizes;
}

export async function getProsperities() {
  const prosperities = await sql<Prosperity[]>`
  SELECT * FROM prosperity_levels
  `;
  return prosperities;
}
