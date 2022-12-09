import { readFile } from 'fs/promises';

const lowerOffset = 96; // Magic number based on .charCodeAt(index) to produce the right 1-26 priority values.
const upperOffset = 38; // Magic number based on .charCodeAt(index) to produce the right 27-52 priority values.

async function day3(): Promise<void> {

  const inputStr = await (await readFile('input.txt')).toString();

  const priorityScoresForDupes = inputStr.split('\n').map((invLine) => {
    const firstCompartment = invLine.substring(0, invLine.length / 2);
    const secondCompartment = invLine.substring(invLine.length / 2);
    const doubledItem = firstCompartment.split('').find((char) => secondCompartment.includes(char));
    if (doubledItem) {
      const charCode = doubledItem.charCodeAt(0);
      if (charCode > 90)
        return charCode - lowerOffset;
      else
        return charCode - upperOffset;
    }
    return 0;
  })

  const dupeScore = priorityScoresForDupes.reduce((acc, score) =>  score + acc, 0)
  console.log(`duplicate item score: ${dupeScore}`);

  const priorityScoresForBadges = inputStr
    .split(/(.+\n.+\n.+)\n/)
    .filter((groupStr) => groupStr.length)
    .map((groupStr) => {
      const [first, second, third] = groupStr.split('\n');
      const badgeItem = first.split('').find((firstChar) => second.includes(firstChar) && third.includes(firstChar));
      if (badgeItem) {
        const charCode = badgeItem.charCodeAt(0);
        if (charCode > 90)
          return charCode - lowerOffset;
        else
          return charCode - upperOffset;
      }
      return 0;
    });
    const badgeScore = priorityScoresForBadges.reduce((acc, score) =>  score + acc, 0)
    console.log(`duplicate item score: ${badgeScore}`);
 }

day3();