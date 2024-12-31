// --- Day 3: Mull It Over ---
// https://adventofcode.com/2024/day/3
// https://www.reddit.com/r/adventofcode/comments/1h5frsp/2024_day_3_solutions

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

const INSTRUCTIONS = new InputReader(input).readAsString();

export function partOne(): number {
    const matches = INSTRUCTIONS.matchAll(/mul\((?<multiplicand>\d+),(?<multiplier>\d+)\)/g);

    let result = 0;

    for (const [, multiplicand, multiplier] of matches) {
        result += Number(multiplicand) * Number(multiplier);
    }

    return result;
}

export function partTwo(): number {
    let result = 0;

    const dos = INSTRUCTIONS.split('do()');
    const donts = dos.map((x) => x.split('don\'t()'));

    donts.forEach((d) => {
        const matches = d[0].matchAll(/mul\((?<multiplicand>\d+),(?<multiplier>\d+)\)/g);
        for (const [, multiplicand, multiplier] of matches) {
            result += Number(multiplicand) * Number(multiplier);
        }
    });

    return result;
}
// /(?<=do\(\)).*?(?<!don't\(\)).*?mul\((\d+),(\d+)\)/g
// /(?<=(^|do\(\))(?:(?!don't\(\)).)+)(mul\(\d{1,3},\d{1,3}\))/g
