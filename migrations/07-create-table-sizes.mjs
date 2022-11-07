export async function up(sql) {
  await sql`
    CREATE TABLE sizes (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
      name varchar(10)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE sizes
  `;
}
