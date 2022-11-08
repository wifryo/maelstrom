const classes = [
  { name: 'Barbarian' },
  { name: 'Bard' },
  { name: 'Cleric' },
  { name: 'Druid' },
  { name: 'Fighter' },
  { name: 'Monk' },
  { name: 'Paladin' },
  { name: 'Ranger' },
  { name: 'Rogue' },
  { name: 'Sorcerer' },
  { name: 'Warlock' },
  { name: 'Wizard' },
  { name: 'Artificer' },
];

export async function up(sql) {
  await sql`
    INSERT INTO classes ${sql(classes, 'name')}
  `;
}

export async function down(sql) {
  for (const singleClass of classes) {
    await sql`
      DELETE FROM
        classes
      WHERE
        name = ${singleClass.name}
    `;
  }
}
