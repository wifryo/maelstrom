const names = [
  { first_name: 'Achillos', verified: true },
  { first_name: 'Aerofib', verified: true },
  { first_name: 'Aggsy', verified: true },
  { first_name: 'Ariadne', verified: true },
  { first_name: 'Arse', verified: true },
  { first_name: 'Bastardus', verified: true },
  { first_name: 'Bobe', verified: true },
  { first_name: 'Bog', verified: true },
  { first_name: 'Borros', verified: true },
  { first_name: 'Brevor', verified: true },
  { first_name: 'Buster', verified: true },
  { first_name: 'Ceebers', verified: true },
  { first_name: 'Chogbert', verified: true },
  { first_name: 'Choggle', verified: true },
  { first_name: 'Crab', verified: true },
  { first_name: 'Crondo', verified: true },
  { first_name: 'Crumpet', verified: true },
  { first_name: 'Denulon', verified: true },
  { first_name: 'Diagonal', verified: true },
  { first_name: 'Ebberp', verified: true },
  { first_name: 'Edmunb', verified: true },
  { first_name: 'Egg', verified: true },
  { first_name: 'Eldrosc', verified: true },
  { first_name: 'Elizabits', verified: true },
  { first_name: 'Floop', verified: true },
  { first_name: 'Fred', verified: true },
  { first_name: 'Fredders', verified: true },
  { first_name: 'Frod', verified: true },
  { first_name: 'Fujj', verified: true },
  { first_name: 'Gibbard', verified: true },
  { first_name: 'Giles', verified: true },
  { first_name: 'Glopper', verified: true },
  { first_name: 'Greg', verified: true },
  { first_name: 'Greggsy', verified: true },
  { first_name: 'Gulpo', verified: true },
  { first_name: 'Halio', verified: true },
  { first_name: 'Herred', verified: true },
  { first_name: 'Hoddle', verified: true },
  { first_name: 'Hunberg', verified: true },
  { first_name: 'Ibble', verified: true },
  { first_name: 'Ignot', verified: true },
  { first_name: 'Ilonius', verified: true },
  { first_name: 'Irascible', verified: true },
  { first_name: 'Jeremiah', verified: true },
  { first_name: 'Jerold', verified: true },
  { first_name: 'Jobathan', verified: true },
  { first_name: 'Joddles', verified: true },
  { first_name: 'Jonathan', verified: true },
  { first_name: 'Juice', verified: true },
  { first_name: 'Knepp', verified: true },
  { first_name: 'Kober', verified: true },
  { first_name: 'Kranch', verified: true },
  { first_name: 'Kreep', verified: true },
  { first_name: 'Kwerb', verified: true },
  { first_name: 'Labbard', verified: true },
  { first_name: 'Lagrange', verified: true },
  { first_name: 'Leodribble', verified: true },
  { first_name: 'Loop', verified: true },
  { first_name: 'Lunch', verified: true },
  { first_name: 'Misquinch', verified: true },
  { first_name: 'Misty', verified: true },
  { first_name: 'Moober', verified: true },
  { first_name: 'Munch', verified: true },
  { first_name: 'Nevertheless', verified: true },
  { first_name: 'Nibb', verified: true },
  { first_name: 'Nippsy', verified: true },
  { first_name: 'Noodle', verified: true },
  { first_name: 'Nugg', verified: true },
  { first_name: 'Obb', verified: true },
  { first_name: 'Offle', verified: true },
  { first_name: 'Onion', verified: true },
  { first_name: 'Oober', verified: true },
  { first_name: 'Oratio', verified: true },
  { first_name: 'Ouch', verified: true },
  { first_name: 'Peep', verified: true },
  { first_name: 'Penenelope', verified: true },
  { first_name: 'Peppo', verified: true },
  { first_name: 'Perpley', verified: true },
  { first_name: 'Pip', verified: true },
  { first_name: 'Poff', verified: true },
  { first_name: 'Porker', verified: true },
  { first_name: 'Porky', verified: true },
  { first_name: 'Prerp', verified: true },
  { first_name: 'Queeb', verified: true },
  { first_name: 'Quenters', verified: true },
  { first_name: 'Quentin', verified: true },
  { first_name: 'Quisp', verified: true },
  { first_name: 'Rimpert', verified: true },
  { first_name: 'Roast', verified: true },
  { first_name: 'Roger', verified: true },
  { first_name: 'Roggle', verified: true },
  { first_name: 'Scrudith', verified: true },
  { first_name: 'Scundy', verified: true },
  { first_name: 'Settring', verified: true },
  { first_name: 'Skeems', verified: true },
  { first_name: 'Splib', verified: true },
  { first_name: 'Splog', verified: true },
  { first_name: 'Sprunge', verified: true },
  { first_name: 'Sprune', verified: true },
  { first_name: 'Squeems', verified: true },
  { first_name: 'Stinker', verified: true },
  { first_name: 'Trandlehampton', verified: true },
  { first_name: 'Tremendous', verified: true },
  { first_name: 'Trevor', verified: true },
  { first_name: 'Tweemers', verified: true },
  { first_name: 'Unguent', verified: true },
  { first_name: 'Urdlesnap', verified: true },
  { first_name: 'Urgus', verified: true },
  { first_name: 'Vallank', verified: true },
  { first_name: 'Veems', verified: true },
  { first_name: 'Vevvsy', verified: true },
  { first_name: 'Vodrimal', verified: true },
  { first_name: 'Weems', verified: true },
  { first_name: 'Wham', verified: true },
  { first_name: 'Whargle', verified: true },
  { first_name: 'Whebber', verified: true },
  { first_name: 'Wheff', verified: true },
  { first_name: 'Whilliam', verified: true },
  { first_name: 'Willian', verified: true },
  { first_name: 'Willy', verified: true },
  { first_name: 'Wonks', verified: true },
  { first_name: 'Xausage', verified: true },
  { first_name: 'Xeg', verified: true },
  { first_name: 'Xristopher', verified: true },
  { first_name: 'Yargle', verified: true },
  { first_name: 'Yebbert', verified: true },
  { first_name: 'Yosom', verified: true },
  { first_name: 'Zip', verified: true },
  { first_name: 'Zoob', verified: true },
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
