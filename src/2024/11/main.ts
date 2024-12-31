// --- Day 11: Plutonian Pebbles ---
// https://adventofcode.com/2024/day/11
// https://www.reddit.com/r/adventofcode/comments/1hbm0al/2024_day_11_solutions

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

const STONES = new InputReader(input).readAsString().split(' ').map(Number);

function addStones(stones: Map<number, number>, stone: number, count: number) {
    const existing = stones.get(stone) ?? 0;
    stones.set(stone, existing + count);
}

function blink(stones: Map<number, number>): Map<number, number> {
    const newStones = new Map<number, number>();

    stones.forEach((count, stone) => {
        const string = stone.toString();

        if (stone === 0) {
            addStones(newStones, 1, count);
        } else if (!(string.length % 2)) {
            const halfIndex = string.length / 2;
            addStones(newStones, Number(string.slice(0, halfIndex)), count);
            addStones(newStones, Number(string.slice(halfIndex)), count);
        } else {
            addStones(newStones, stone * 2024, count);
        }
    }, []);

    return newStones;
}

export function partOne(): number {
    let stones = new Map<number, number>();

    STONES.forEach((stone) => {
        addStones(stones, stone, 1);
    });

    for (let i = 0; i < 25; i++) {
        stones = blink(stones);
    }

    return Array.from(stones.values()).reduce((acc, currentValue) => acc + currentValue, 0);
}

export function partTwo(): number {
    let stones = new Map<number, number>();

    STONES.forEach((stone) => {
        addStones(stones, stone, 1);
    });

    for (let i = 0; i < 75; i++) {
        stones = blink(stones);
    }

    return Array.from(stones.values()).reduce((acc, currentValue) => acc + currentValue, 0);
}
