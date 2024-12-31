// --- Day 10: Hoof It ---
// https://adventofcode.com/2024/day/10
// https://www.reddit.com/r/adventofcode/comments/1hau6hl/2024_day_10_solutions

import { InputReader } from '#src/input';
import { pairUnsigned } from '#src/utils';

const [, , , , input] = process.argv;

const MAP = new InputReader(input).readAsGrid(Number);

const abc = new Map<number, number[]>();

function count(
    rowIndex: number,
    columnIndex: number,
    height: number,
    part2 = false,
    originNode?: [number, number],
): number {
    const tile = MAP[rowIndex]?.[columnIndex];

    if (tile !== height) {
        return 0;
    }

    let origin = originNode;
    if (!origin) {
        origin = [rowIndex, columnIndex];
        abc.set(pairUnsigned([rowIndex, columnIndex]), []);
    }

    if (height === 9) {
        if (part2) {
            return 1;
        }

        const pairedOrigin = pairUnsigned(origin);
        const paired = pairUnsigned([rowIndex, columnIndex]);

        const exists = abc.get(pairedOrigin)?.includes(paired);

        if (!exists) {
            abc.get(pairedOrigin)?.push(paired);
        }

        return Number(!exists);
    }

    let options = 0;

    options += count(rowIndex - 1, columnIndex, height + 1, part2, origin);
    options += count(rowIndex + 1, columnIndex, height + 1, part2, origin);
    options += count(rowIndex, columnIndex - 1, height + 1, part2, origin);
    options += count(rowIndex, columnIndex + 1, height + 1, part2, origin);

    return options;
}

export function partOne(): number {
    return MAP.reduce((counter, row, rowIndex) => {
        return counter + row.reduce((rowCounter, tile, columnIndex) => {
            return rowCounter + count(rowIndex, columnIndex, 0);
        }, 0);
    }, 0);
}

export function partTwo(): number {
    return MAP.reduce((counter, row, rowIndex) => {
        return counter + row.reduce((rowCounter, tile, columnIndex) => {
            return rowCounter + count(rowIndex, columnIndex, 0, true);
        }, 0);
    }, 0);
}
