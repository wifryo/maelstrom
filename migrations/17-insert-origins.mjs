const origins = [
  { name: 'Dragonborn' },
  { name: 'Dwarf' },
  { name: 'Elf' },
  { name: 'Gnome' },
  { name: 'Half-Elf' },
  { name: 'Halfling' },
  { name: 'Half-Orc' },
  { name: 'Human' },
  { name: 'Tiefling' },
  /* { name: 'Leonin' },
  { name: 'Satyr' },
  { name: 'Owlin' },
  { name: 'Aarakocra' },
  { name: 'Aasimar' },
  { name: 'Air Genasi' },
  { name: 'Bugbear' },
  { name: 'Centaur' },
  { name: 'Changeling' },
  { name: 'Deep Gnome' },
  { name: 'Duergar' },
  { name: 'Earth Genasi' },
  { name: 'Eladrin' },
  { name: 'Fairy' },
  { name: 'Firbolg' },
  { name: 'Fire Genasi' },
  { name: 'Githyanki' },
  { name: 'Githzerai' },
  { name: 'Goblin' },
  { name: 'Goliath' },
  { name: 'Harengon' },
  { name: 'Hobgoblin' },
  { name: 'Kenku' }, */
];

export async function up(sql) {
  await sql`
    INSERT INTO origins ${sql(origins, 'name')}
  `;
}

export async function down(sql) {
  for (const origin of origins) {
    await sql`
      DELETE FROM
        origins
      WHERE
        name = ${origin.name}
    `;
  }
}
