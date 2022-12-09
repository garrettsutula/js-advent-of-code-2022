import { readFile } from 'fs/promises';

async function day1part1(): Promise<void> {

  const inputStr = await (await readFile('input.txt')).toString()

  const elfInvCals = inputStr
    .split('\n\n').map((elfInvStr) => elfInvStr.split('\n'))
    .map((elfInv) => elfInv.reduce((acc, invSlot) => acc + parseInt(invSlot), 0))
    .sort((a, b) => b - a);
  
    console.log(`part 1: ${elfInvCals[0]}`);
    console.log(`part 2: ${elfInvCals[0] + elfInvCals[1] + elfInvCals[2]}`);
    
 }

day1part1();