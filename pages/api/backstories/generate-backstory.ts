import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { getValidSessionByToken } from '../../../database/sessions';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(prompt: Text) {
  return `Generate a brief, original backstory for a D&D adventurer.

Prompt: Human Paladin named Crudd Stonechump
Backstory: Crudd Stonechump was born in Winterholme to innkeepers. He always had a strong sense of justice, and became a paladin when he was of age.
Prompt: Dwarven Barbarian named Ragbor Minecrunch
Backstory: Ragbor Minecrunch was always quick to anger, and followed in a rich tradition of barbarians in his family. He loves his friends and hates his enemies with equal vigour.
Prompt: Human Bard named Ben Jerdles
Backstory: Ben Jerdles was talented in the art of poetry from an early age. He makes his living using slam poetry to inspire his allies in battle.
Prompt: ${prompt}
Backstory:`;
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
      max_tokens: 50,
    });
    if (completion.data.choices[0]) {
      response.status(200).json({ result: completion.data.choices[0].text });
    }
    return;
  }
  return response.status(400).json({ message: 'Method Not Allowed' });
}
