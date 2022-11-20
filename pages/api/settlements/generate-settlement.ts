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

Prompt: Wealthy human hamlet
Settlement: Gradholme is a hamlet in the foothills of the Grendlechip Range. Populated mostly by human merchants who trade in the nearby city of Krankentown, Gradholme is a wealthy place with many expensive houses. The gossip in the hamlet is that a werewolf has been spotted nearby.
Prompt: Poor dwarf city
Settlement: Boatmurdered is an underground dwarven city that has seen better days. After a long war against the neighbouring Elven city-state of Elfborough, the city's economy was left in tatters. However, after an armistice with the Elves was signed, the inhabitants feel hopeful for the future.
Prompt: Average elf town
Settlement: Plethdorius is an elvish town of average prosperity. Its economy is based primarily on the trade of magical herbs harvested from the nearby woods. The inhabitants are tolerant of outsiders.
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
      // Return settlement description to frontend
      response.status(200).json({ result: completion.data.choices[0].text });
      // Get settlement object (without description text)
      const settlementObject = request.body.settlementObject;
      // Add settlement description to object
      settlementObject.description = completion.data.choices[0].text;
      // Add entire object to database
      await createSettlement(settlementObject, request.cookies.sessionToken);
    }
    return;
  }
  return response.status(400).json({ message: 'Method Not Allowed' });
}
