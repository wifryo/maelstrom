import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { getValidSessionByToken } from '../../../database/sessions';
import { createSettlement } from '../../../database/settlements';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(prompt: Text) {
  return `Generate a brief description for a settlement in a D&D campaign.

Prompt: Poor human village
Settlement: Crendlehampton is a small town lying on the very edge of the forest and was founded primarily for travellers to restock before travelling into the deep woods. Over the past couple of weeks, people have been mysteriously vanishing from town. When the mayor one day vanished, the town went into a panic. Something evil is stealing the villagers and taking them into the woods.
Settlement: Boatmurdered is an underground dwarven city that has seen better days. After a long war against the neighbouring Elven city-state of Elfborough, the city's economy was left in tatters. However, after an armistice with the Elves was signed, the inhabitants feel hopeful for the future.
Prompt: Average elf town
Settlement: Trall Dorei is a small desert community built around a shipwreck. No one seems to know how the ship got here. Legend says that it was caught in a giant storm that lifted it out of the sea. Others say it was a giant wave. Either way the original sailors had obviously angered some god. Many people live inside of the ship, including the mayor who lives in the former captain’s quarters. There are also some tents and makeshift shelters around the ship.
Prompt: Prosperous dwarf city
Settlement: Long ago, far beneath the ground, a group of dwarven miners discovered a massive quartz crystal that provided warmth all year round. The great city of Karathimeth was founded here, its geothermal wonder and the fertile mushroom-growing soil surrounding it providing food and protection against the cold and barren surroundings for generations.
Prompt: Wealthy elf village
Settlement: The only village on the Island of Whispered Regrets, Cliffwatch is all but invisible when approached by land. The deeply overhanging cliffs that give the village its name are also host to a forest of enormous trees. Their incredibly dense roots, enhanced with some judiciously applied elvish magic, have allowed the village to form on the underside of the cliffs. While there are secret routes from the village to the top of the island, almost all visitors arrive by sea, sailing into the well-sheltered harbor that sits directly below Cliffwatch. At night, the bridges and windows of the village shine brightly, though they are eclipsed easily by the powerful Cliffwatch Beacon, a magically fueled lighthouse built into the end of the longest taproot of the trees above.
Prompt: Poor human town
Settlement: While the town's true name was Ska'aum, a word that meant temporary haven, over the years it has come to earn the bastardised version of its name. A place populated by bandits and thieves, killers and assassins, Skum has one, ironclad law; never deal your fellow residents raw. Allegiance to that single rule makes the town, if not peaceful, a place that is much safer than its reputation would suggest. Unless, that is, someone's coming to the town with a writ, or a badge. Those things will get you strung up at the crossroads as an example to other do-gooders and bounty hunters that Skum is not a place for them.
Prompt: ${prompt}
Settlement:`;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  console.log('session is passed', request.cookies.sessionToken);

  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  if (request.method === 'POST') {
    if (!request.cookies.sessionToken) {
      response
        .status(400)
        .json({ errors: [{ message: 'No session token passed' }] });
      return;
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: generatePrompt(request.body.prompt),
      temperature: 0.9,
      max_tokens: 500,
    });
    if (completion.data.choices[0]) {
      // Get settlement object (without description text)
      const incompleteSettlementObject = request.body.settlementObject;
      // Add settlement description to object
      incompleteSettlementObject.description = completion.data.choices[0].text;
      // Add entire object to database
      const settlementObject = await createSettlement(
        incompleteSettlementObject,
        request.cookies.sessionToken,
      );
      // Return settlement object to frontend
      response.status(200).json(settlementObject);
    }
    return;
  }
  return response.status(400).json({ message: 'Method Not Allowed' });
}
