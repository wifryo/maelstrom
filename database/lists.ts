import { sql } from './connect';

export type CharacterClass = {
  id: number;
  name: string;
};

export type Origin = {
  id: number;
  name: string;
};

export type Size = {
  id: number;
  name: string;
};

export type ProsperityLevel = {
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
  const origins = await sql<Origin[]>`
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

export async function getProsperityLevels() {
  const prosperityLevels = await sql<ProsperityLevel[]>`
  SELECT * FROM prosperity_levels
  `;
  return prosperityLevels;
}
