const names = [
  { first_name: 'Achillos', verified: true },
  { first_name: 'Aerofib', verified: true },
  { first_name: 'Aggsy', verified: true },
  { first_name: 'Ariadne', verified: true },
  { first_name: 'Arse', verified: true },
  { first_name: 'Bastardus', verified: true },
  { first_name: 'Bobe', verified: true },
];

export async function up(sql) {
  await sql`
    INSERT INTO first_names ${sql(names, 'first_name', 'verified')}
  `;
}

export async function down(sql) {
  for (const name of names) {
    await sql`
      DELETE FROM
        first_names
      WHERE
        first_name = ${name.first_name} AND
        verified = ${name.verified}
    `;
  }
}
