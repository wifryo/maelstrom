const settlements = [
  {
    prosperity_id: 5,
    species_id: 6,
    size_id: 3,
    description:
      ' Located in the heart of the farmland that supplies the region with food, Halfhill is a peaceful and prosperous town. The halflings who live here are hard-working and friendly, always ready with a pot of tea and a warm meal for weary travellers. The town is surrounded by a large wall to keep out predators and monsters, and Halfhill is known for its excellent archers who keep watch from the top of the walls.',
    verified: false,
  },
  {
    prosperity_id: 5,
    species_id: 4,
    size_id: 3,
    description:
      " The town of Noggen is a prosperous gnome town located in the middle of a dense forest. The town is known for its many inventors and engineers, who have created all sorts of strange and wonderful gadgets and contraptions. The town is also home to a large group of magicians, who keep the town's many machines and contraptions running smoothly.",
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 9,
    size_id: 3,
    description:
      " Devil's Crossing was once a rich and prosperous town, but now it is a shadow of its former self. The townsfolk are all tieflings, and they have been cursed by the devil that they worshipped. The town is now a haven for criminals and murderers, and the only law is the law of the jungle. The only businesses that are thriving are the ones that cater to the dark desires of the townsfolk.",
    verified: false,
  },
  {
    prosperity_id: 4,
    species_id: 8,
    size_id: 4,
    description:
      ' Nestled in a valley with a river running through it, Daggerford is a prosperous city that has managed to stay out of the major wars that have ravaged the land. It is a hub of trade and commerce, and its people are known for their friendliness and hospitality. The city is well defended, with a strong city guard and a moat that surrounds the city walls.',
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 1,
    size_id: 1,
    description:
      ' Neskar is a small, poor hamlet of Dragonborn that have been outcasts of their kin. They were driven out due to their small size and physical deformities. Most residents of Neskar are farmers, as the land is not good for much else. They scrape by, but they do not complain. They know that they are lucky to have a place to call home, even if it is not much.',
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 8,
    size_id: 1,
    description:
      " Livestockton is a small hamlet that sits on the edge of the Kingdom. It's residents are mostly farmers who raise livestock. The villagers are poor, but they are content. Recently, there have been rumors of monsters in the nearby forest, and the villagers are worried.",
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 8,
    size_id: 1,
    description:
      " Hanley is a small hamlet on the edge of the kingdom that has seen better days. The town is plagued by bandits who steal from the villagers and take whatever they want. The villagers are poor and have little to defend themselves with. The only thing of value in the town is the old temple that was built by the villagers' ancestors.",
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 2,
    size_id: 4,
    description:
      ' Founded over a rich vein of gold, Felde had a boomtown beginning that led to its current state of decline. With the gold largely mined out, and the physical distance to other settlements proving a deterrent to trade, Felde has become a city of poverty and crime. What little law and order that remains is provided by the city guard, who are more likely to be bribed than to actually enforce the law. Most of the populace ekes out a living as best they can, while the wealthiest citizens have long since left for greener pastures.',
    verified: false,
  },
  {
    prosperity_id: 4,
    species_id: 2,
    size_id: 4,
    description:
      ' The city of Kelvstone is located in the middle of a large mountain range. The dwarves who live here have mined the mountains for centuries, and their knowledge of engineering is unsurpassed. The city is full of well-made stone buildings, and the streets are lined with statues of famous dwarves. The city is also home to a large number of smiths, who create both practical and decorative items. The city is prosperous, and the dwarves are friendly and welcoming to visitors.',
    verified: false,
  },
  {
    prosperity_id: 5,
    species_id: 8,
    size_id: 5,
    description:
      " The City of Brass has long been a beacon of hope and opportunity in a land of harsh desert. Founded by a group of exiles from a far-off land, the city has grown to be a bustling metropolis, with people from all walks of life coming to make their fortunes. The city is well-defended, both by its high walls and the magic of the brass golems that patrol them. The golems are a product of the city's founder's, a group of wizards who still hold a great deal of power in the city. The city is also home to a large number of temples, devoted to a wide variety of gods.",
    verified: false,
  },
  {
    prosperity_id: 2,
    species_id: 1,
    size_id: 5,
    description:
      " Hak'ar-ath is a city of Dragonborn that has seen better days. Once a prosperous metropolis, it has been reduced to little more than a shell of its former self. The Dragon Queen and her followers were driven out long ago, and the city has been in decline ever since. The only thing that keeps the city from being completely abandoned is the fact that it is the only safe haven for miles around. Anyone who wants to avoid being eaten by a dragon or enslaved by a band of raiders knows that Hak'ar-ath is the place to be.",
    verified: false,
  },
  {
    prosperity_id: 4,
    species_id: 1,
    size_id: 5,
    description:
      ' The City-State of Tymanther is a young settlement, only having been founded 100 years ago. It is built atop the remains of an ancient city of the same name, which was destroyed in a great war. The Tymantherites have since rebuilt their city and have made it into a prosperous metropolis. It is a haven for Dragonborn and is known for its great military.',
    verified: false,
  },
  {
    prosperity_id: 5,
    species_id: 1,
    size_id: 5,
    description:
      " The City-State of Xyphos is a prosperous metropolis built on the trade of goods and services. Its primary export is information, and it is said that there is nothing that cannot be found in the city's library. The city is also home to a large number of Dragonborn, who have made it their mission to protect the city and its inhabitants. They can be seen patrolling the streets, guarding the city's gates, and patrolling the skies on their dragons.",
    verified: false,
  },
  {
    prosperity_id: 1,
    species_id: 1,
    size_id: 2,
    description:
      ' Once a prosperous village, New Hope has fallen on hard times. The village is home to a small number of dragonborn, who have been struggling to make ends meet since the death of their patriarch. With no leader and no hope, the dragonborn have turned to crime and begging to try and survive.',
    verified: false,
  },
  {
    prosperity_id: 4,
    species_id: 7,
    size_id: 3,
    description:
      ' Overwatch is a wealthy half-orc town that is built on top of a large hill. The town has a great view of the surrounding area and is very defensible. The town is also known for its great blacksmiths who make some of the best weapons and armor in the area.',
    verified: false,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO settlements ${sql(
      settlements,
      'size_id',
      'prosperity_id',
      'species_id',
      'description',
      'verified',
    )}
  `;
}

export async function down(sql) {
  for (const settlement of settlements) {
    await sql`
      DELETE FROM
        settlements
      WHERE
        size_id = ${settlement.size_id} AND
        prosperity_id = ${settlement.prosperity_id} AND
        species_id = ${settlement.species_id} AND
        description = ${settlement.description} AND
        verified = ${settlement.verified}
    `;
  }
}
