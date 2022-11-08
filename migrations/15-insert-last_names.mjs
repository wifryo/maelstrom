const names = [
  { last_name: 'Angle', verified: true },
  { last_name: 'Baragh', verified: true },
  { last_name: 'Beef', verified: true },
  { last_name: 'Blerdge', verified: true },
  { last_name: 'Bonk', verified: true },
  { last_name: 'Brebblington', verified: true },
  { last_name: 'Cheesefellow', verified: true },
];

export async function up(sql) {
  await sql`
    INSERT INTO last_names ${sql(names, 'last_name', 'verified')}
  `;
}

export async function down(sql) {
  for (const name of names) {
    await sql`
      DELETE FROM
        last_names
      WHERE
        last_name = ${name.last_name} AND
        verified = ${name.verified}
    `;
  }
}
