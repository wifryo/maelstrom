const species = [
  { name: 'Dragonborn', source: 'core' },
  { name: 'Dwarf', source: 'core' },
  { name: 'Elf', source: 'core' },
  { name: 'Gnome', source: 'core' },
  { name: 'Half-Elf', source: 'core' },
  { name: 'Halfling', source: 'core' },
  { name: 'Half-Orc', source: 'core' },
  { name: 'Human', source: 'core' },
  { name: 'Tiefling', source: 'core' },
  { name: 'Leonin', source: 'MOoT' },
  { name: 'Owlin', source: 'MOoT' },
  { name: 'Aarakocra', source: 'MoTM' },
  { name: 'Aasimar', source: 'MoTM' },
  { name: 'Air Genasi', source: 'MoTM' },
  { name: 'Bugbear', source: 'MoTM' },
  { name: 'Centaur', source: 'MoTM' },
  { name: 'Changeling', source: 'MoTM' },
  { name: 'Deep Gnome', source: 'MoTM' },
  { name: 'Duergar', source: 'MoTM' },
  { name: 'Earth Genasi', source: 'MoTM' },
  { name: 'Eladrin', source: 'MoTM' },
  { name: 'Fairy', source: 'MoTM' },
  { name: 'Firbolg', source: 'MoTM' },
  { name: 'Fire Genasi', source: 'MoTM' },
  { name: 'Githyanki', source: 'MoTM' },
  { name: 'Githzerai', source: 'MoTM' },
  { name: 'Goblin', source: 'MoTM' },
  { name: 'Goliath', source: 'MoTM' },
  { name: 'Harengon', source: 'MoTM' },
  { name: 'Hobgoblin', source: 'MoTM' },
  { name: 'Kobold', source: 'MoTM' },
  { name: 'Lizardfolk', source: 'MoTM' },
  { name: 'Minotaur', source: 'MoTM' },
  { name: 'Orc', source: 'MoTM' },
  { name: 'Satyr', source: 'MoTM' },
  { name: 'Sea Elf', source: 'MoTM' },
  { name: 'Shadar-kai', source: 'MoTM' },
  { name: 'Shifter', source: 'MoTM' },
  { name: 'Tabaxi', source: 'MoTM' },
  { name: 'Tortle', source: 'MoTM' },
  { name: 'Triton', source: 'MoTM' },
  { name: 'Water Genasi', source: 'MoTM' },
  { name: 'Yuan-ti', source: 'MoTM' },
];

export async function up(sql) {
  await sql`
    INSERT INTO species ${sql(species, 'name')}
  `;
}

export async function down(sql) {
  for (const singleSpecies of species) {
    await sql`
      DELETE FROM
        species
      WHERE
        name = ${singleSpecies.name}
    `;
  }
}
