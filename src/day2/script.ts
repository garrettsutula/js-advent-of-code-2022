import { readFile } from 'fs/promises';

async function day2part1(): Promise<void> {
  function getPlayType(playStr: string) {
    const rock = ['A', 'X'];
    const paper =['B', 'Y'];
    const scissors = ['C', 'Z'];
    if (rock.includes(playStr)) return 'rock';
    if (paper.includes(playStr)) return 'paper';
    if (scissors.includes(playStr)) return 'scissors';
    throw new Error('playStr didnt map to a expected play type');
  }
  
  const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    win: 6,
    lose: 0,
    draw: 3
  };


  const fileStr = await (await readFile('input.txt')).toString();
  const rounds = fileStr.split('\n');
  let score = 0;

  rounds.forEach((roundStr) => {
    let [theirPlay, myPlay] = roundStr.split(' ').map((playStr) => getPlayType(playStr));
    score += points[myPlay];
    if (theirPlay == myPlay) {
      score += points.draw;
    } else if (
      myPlay === 'rock' && theirPlay === 'scissors' ||
      myPlay === 'scissors' && theirPlay === 'paper' ||
      myPlay === 'paper' && theirPlay === 'rock'
    ) {
      score += points.win;
    }
  })
  console.log(score);
 }

 async function day2part2(): Promise<void> {
  function getOutcome(outcomeStr: string) {
    switch(outcomeStr) {
      case 'X':
        return 'lose';
      case 'Y':
        return 'draw';
      case 'Z':
        return 'win'
      default:
        throw new Error(`unexpected outcome string: ${outcomeStr}`);
    }
  }
  function getPlayType(playStr: string) {
    const rock = ['A'];
    const paper =['B'];
    const scissors = ['C'];
    if (rock.includes(playStr)) return 'rock';
    if (paper.includes(playStr)) return 'paper';
    if (scissors.includes(playStr)) return 'scissors';
    throw new Error('playStr didnt map to a expected play type');
  }

  function getMyPlay(theirPlay: string, outcome: string) {
    switch(`${theirPlay}-${outcome}`) {
      case 'rock-lose':
      case 'paper-win':
      case 'scissors-draw':
        return 'scissors';
      case 'rock-win':
      case 'paper-draw':
      case 'scissors-lose':
        return 'paper';
      case 'rock-draw':
      case 'paper-lose':
      case 'scissors-win':
        return 'rock';
      default:
        throw new Error(`unrecognized play outcome combination: ${theirPlay}-${outcome}`);
    }
  }
  const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    win: 6,
    lose: 0,
    draw: 3
  };


  const fileStr = await (await readFile('input.txt')).toString();
  const rounds = fileStr.split('\n').map((roundStr) => roundStr.split(' '));
  let score = 0;

  rounds.forEach(([theirPlayStr, outcomeStr]) => {
    const theirPlay = getPlayType(theirPlayStr);
    const outcome = getOutcome(outcomeStr);
    const myPlay = getMyPlay(theirPlay, outcome);
    score += points[myPlay] + points[outcome];
  });
  console.log(score);
 }

 day2part2();