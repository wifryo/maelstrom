const backstories = [
  {
    class_id: 5,
    origin_id: 7,
    first_name_id: 4,
    last_name_id: 12,
    backstory:
      "[firstName] only recently celebrated his 40 year anniversary at the Saltmarsh customs declaration office and his 12th year as Chief Assistant in Waiting to the Head of Customs Declarations. His passion for his job and for law and order in general has been dampened by unnamed horrors and sea creatures attacking trading ships with increasing frequency. Since nobody else seems to be willing to step up to fight them, he volunteered to retrain as a fighter and take care of the issue himself - a move strongly encouraged by his superiors and everyone who has ever worked with him. Who knows, maybe if he's successful he will finally be promoted to Chief Assistant to the Head of Customs.",
    verified: true,
  },
  {
    class_id: 3,
    origin_id: 8,
    first_name_id: 6,
    last_name_id: 23,
    backstory:
      "[firstName] [lastName] grew up in an orphanage and never knew her birth family. It didn't matter though, for she had all the brothers and sisters she needed at the orphanage. When she was old enough, [firstName] started working for a gang doing low-level enforcement. When one day she was lurking in an alleyway, dagger at the ready, she had a bag placed over her head and was grabbed from behind, she was mostly just surprised it hadn't happened sooner. Kidnapped and taken to an unknown location, her captors performed an operation on her. It was a blur of drugs and voices. All she knows is that she closed her eyes, and when she opened them again, she saw differently - a different, bewildering angle, and different colours, and different lights, and just DIFFERENT - and that the horror she felt was shared by something inside her. She felt seasick, and scared, and spent what felt like days just vomiting. When she had gotten somewhat used to her new vision, and to the tentacles constantly brushing her mouth and shoulders, and most importantly to the new 'presence' she felt, the experiments began. It was awful, and the things they made her do were terrible, but she could bear this. With the help of her new internal companion, she learned the Deep Speech rapidly, but she couldn't fulfil any of the other tasks her captors required of her. They complained that she was too old, too slow, and eventually she felt the familiar bag over her head and was left wrapped up in the same alley where she had been captured.",
    verified: true,
  },
  {
    class_id: 10,
    origin_id: 3,
    first_name_id: 2,
    last_name_id: 3,
    backstory:
      "[firstName] [lastName] grew up in the cold coastal waters near Icehaven, not far away from the Fridig Depths. Her mother, Chyronn, is the leader of a group of about 60 aquatic elves, though she reached this position not because of her own abilities. The Fey granted her special gifts - charisma, powerful magic - in exchange for her firstborn. She agreed, and even though she may not have reached her current position because she was the most able - wasn't her dedication and her conviction in reaching it also a form of ability? She seems to think so at least. [firstName] knows this story, or parts of it anyway. Who exactly her father was, and what he had to say about this pact remains unclear, and Chyronn shuts down any mention of him. [firstName] doesn't mind particularly, for she spent part of her childhood in the Feywild, part of it in the icy ocean, and she knows which part she prefers. The Fey court with its beauty, riches and splendour haunts her dreams, yet she can never go there of her own accord, she has to wait for the Fey to fetch her, and they do so less and less. Her last visit was years ago, and she's beginning to wonder if it was all a dream. So if she can't live out her days in the Feywild, she will set out to see what other wonders the rest of the world may hold.",
    verified: true,
  },
  {
    class_id: 10,
    origin_id: 9,
    first_name_id: 127,
    last_name_id: 51,
    backstory:
      "[firstName] [lastName] was born in Neverwinter. She grew up the youngest of three in a rich merchant family but had an epiphany aged 14 when reading the introduction to Barovian philosopher Jarl Mars's 'Gold Pieces': being rich is a crime. With sudden clarity, she saw her career path, nay, destiny: she'd steal from the rich and give to the poor, just like in that kid's book she'd never admit to still rereading on occasion. She packed her belongings and landed her first and to date biggest bounty by stealing some of her parents' money and making for Waterdeep. There she quickly realised that most rich people intend on staying that way and are very willing to invest in security, and she figured that stealing from the less rich was an acceptable interim solution, especially considering that she was now much poorer than many of the poor, and it's all a sliding scale really. She met a Tiefling Rogue called Skaakas who taught her some card tricks, gifted her a set of weighted dice and generally became a bit of a mentor to her. Now, 10 years later, [firstName] has lived in various places up and down the Swordcoast (and is wanted almost everywhere) but has never returned to her hometown or seen her biological parents Pot and Tea, her brother Sticks or her sister Mallard again; she considers Skaakas and some of her fellow street urchins her family. She still has a preference for stealing from the rich if available and possible, but is willing to consider alternative victims whenever necessary. She hasn’t really given any considerable amount of money to the poor as of yet, has in fact probably received more from Skaakas et al and is operating on a wealth redistribution deficit. This may all change now though since she recently discovered while performing card tricks that she appears to have certain powers that she had not previously been aware of.",
    verified: true,
  },
  {
    class_id: 1,
    origin_id: 7,
    first_name_id: 85,
    last_name_id: 30,
    backstory:
      '[firstName] grew up as a stage hand in the Witchlight Carnival and genuinely believed that Unkk the Strong (a harengon barbarian) and Valyrian (an aasimar artificer) were his parents for longer than he now cares to admit. Nobody knows who his real parents are and he never make any particular effort to try and find out, though he did wonder at times. As a not particularly fast but surprisingly strong half-orc, he stumbled upon a quick way of making money on the side in between Witchlight jobs: bets. Coursing is a rather violent form of racing popular in some parts of the known worlds. The rules are simply that there are no rules, contestants may resort to any measure they see fit in order to stop their opponent and cross the finish line first. Strong but slow contestants tend to make good use of this rule, but [firstName] will give them a run – or rather, a fight for their money by showing off his unnatural speed only to then stop, turn around, and face his opponent head on. It’s a tough life, but it’s all he’s ever known and he likes the camaraderie he found in the circus. Recently though he has started to wonder if there might be another, easier way of making money out there, and has turned to adventuring…',
    verified: true,
  },
  {
    class_id: 11,
    origin_id: 6,
    first_name_id: 44,
    last_name_id: 65,
    backstory:
      '[firstName] [lastName], famed archaeologist and adventurer, is a greying, curly-haired halfling with a penchant for outrageous outfits, absurd hair pieces and fast vehicles. Her point of pride is her intellect, and she’d rather die than confess that it has not always been like this. In school and later during her studies and training as an archaeologist, she barely scraped by – until one day she found a beautiful if dusty headband in a dungeon she and her professor were exploring. She immediately tried it on (already proof that her mental capacities pre-headband were nothing to write home about) and suddenly saw the world around her with new, sharper eyes. She hasn’t taken it off since. Not long after she acquired this new accessory, her thus far rather ordinary fate began to change. During an excavation on the Moonshae Isles, she found an ancient altar which her new powers of deduction told her instantly was still brimming with ancient magic. Without hesitation she fell to her knees and began to pray, awkwardly at first, then freely and with fervour. As if in a trance she realised that she was speaking a language she had never learned, yet she understood every word. The dusty sandstone depicting a unicorn seemed to look at her – no, it WAS looking at her, and it was glowing in a golden light. This was the first time she met Kamerynn, the unicorn who was to bestow growing powers upon her, and whom she has served ever since. She continued her illustrious career as an archaeologist but in recent years started a side hustle as an adventurer with some friends she met along the way. Despite her often annoying, overbearing personality, her reckless truth-bending, her frivolous thrill-seeking and her misplaced arrogance, she is a deeply loyal person who truly cares about her friends and would do anything to protect them.',
    verified: true,
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO backstories ${sql(
      backstories,
      'class_id',
      'origin_id',
      'first_name_id',
      'last_name_id',
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
        first_name_id = ${backstory.first_name_id} AND
        last_name_id = ${backstory.last_name_id} AND
        backstory = ${backstory.backstory} AND
        verified = ${backstory.verified}
    `;
  }
}
