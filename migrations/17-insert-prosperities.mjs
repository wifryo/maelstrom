const prosperities = [
  { name: 'Destitute' },
  { name: 'Poor' },
  { name: 'Average' },
  { name: 'Wealthy' },
  { name: 'Prosperous' },
];

export async function up(sql) {
  await sql`
    INSERT INTO prosperities ${sql(prosperities, 'name')}
  `;
}

export async function down(sql) {
  for (const prosperity of prosperities) {
    await sql`
      DELETE FROM
        prosperities
      WHERE
        name = ${prosperity.name}
    `;
  }
}
