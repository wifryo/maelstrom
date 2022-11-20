export function addNamesToText(
  textInput: string,
  firstName: string,
  lastName: string,
) {
  let textOutput = textInput.replaceAll('[firstName]', firstName);
  textOutput = textOutput.replaceAll('[FirstName]', firstName);
  textOutput = textOutput.replaceAll('[lastName]', lastName);
  return textOutput;
}
