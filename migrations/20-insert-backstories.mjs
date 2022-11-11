const backstories = [
  {
    class_id: 5,
    origin_id: 7,
    backstory:
      "Kirkley only recently celebrated his 40 year anniversary at the Saltmarsh customs declaration office and his 12th year as Chief Assistant in Waiting to the Head of Customs Declarations. His passion for his job and for law and order in general has been dampened by unnamed horrors and sea creatures attacking trading ships with increasing frequency. Since nobody else seems to be willing to step up to fight them, he volunteered to retrain as a fighter and take care of the issue himself - a move strongly encouraged by his superiors and everyone who has ever worked with him. Who knows, maybe if he's successful he will finally be promoted to Chief Assistant to the Head of Customs.",
    verified: true,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO backstories ${sql(
      backstories,
      'class_id',
      'origin_id',
      'backstory',
      'verified',
    )}
  `;
}

export async function down(sql) {
  for (const backstory of backstories) {
    await sql`
      DELETE FROM
        backstories
      WHERE
        class_id = ${backstory.class_id} AND
        origin_id = ${backstory.origin_id} AND
        backstory = ${backstory.backstory} AND
        verified = ${backstory.verified}
    `;
  }
}
