const sizes = [
  { name: 'Hamlet' },
  { name: 'Village' },
  { name: 'Town' },
  { name: 'City' },
  { name: 'Metropolis' },
];

export async function up(sql) {
  await sql`
    INSERT INTO sizes ${sql(sizes, 'name')}
  `;
}

export async function down(sql) {
  for (const size of sizes) {
    await sql`
      DELETE FROM
        sizes
      WHERE
        name = ${size.name}
    `;
  }
}
