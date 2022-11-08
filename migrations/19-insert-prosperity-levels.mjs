const prosperityLevels = [
  { name: 'Destitute' },
  { name: 'Poor' },
  { name: 'Average' },
  { name: 'Wealthy' },
  { name: 'Prosperous' },
];

export async function up(sql) {
  await sql`
    INSERT INTO prosperity_levels ${sql(prosperityLevels, 'name')}
  `;
}

export async function down(sql) {
  for (const prosperityLevel of prosperityLevels) {
    await sql`
      DELETE FROM
        prosperity_levels
      WHERE
        name = ${prosperityLevel.name}
    `;
  }
}
