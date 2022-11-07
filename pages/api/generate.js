import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Generate three new names for a D&D adventurer.

Theme: absurd
Names: Scredd Boabson, Jimmy the Crust, Grubblington Pip
Theme: dwarven
Names: Beard Stonecrunch, Pickaxe Minefriend, Ale Drinkslurp
Theme: human
Names: Ben Jerdles, Timmy Plopper, Creddle Stinglesnap
Theme: ${capitalizedAnimal}
Names:`;
}

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
