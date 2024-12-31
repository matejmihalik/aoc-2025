// --- Day 6: Guard Gallivant ---
// https://adventofcode.com/2024/day/6
// https://www.reddit.com/r/adventofcode/comments/1h7tovg/2024_day_6_solutions/

import { InputReader } from '#src/input';
import { pairUnsigned, unpairUnsigned } from '#src/utils';

const [, , , , input] = process.argv;

const LAB_MAP = new InputReader(input).readAsGrid();

const STARTING_ROW = LAB_MAP.findIndex((row) => row.includes('^'));
const STARTING_COLUMN = LAB_MAP[STARTING_ROW].findIndex((col) => col === '^');

const VISITED = new Set<number>();

enum DIRECTION {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export function partOne(): number {
    let direction = DIRECTION.UP;
    let currentRow = STARTING_ROW;
    let currentCol = STARTING_COLUMN;

    while (currentRow >= 0 && currentRow < LAB_MAP.length && currentCol >= 0 && currentCol < LAB_MAP[0].length) {
        VISITED.add(pairUnsigned([currentRow, currentCol]));

        if (direction === DIRECTION.UP) {
            if (LAB_MAP[currentRow - 1]?.[currentCol] === '#') {
                direction = DIRECTION.RIGHT;
            } else {
                currentRow--;
            }
        }

        if (direction === DIRECTION.RIGHT) {
            if (LAB_MAP[currentRow]?.[currentCol + 1] === '#') {
                direction = DIRECTION.DOWN;
            } else {
                currentCol++;
            }
        }

        if (direction === DIRECTION.DOWN) {
            if (LAB_MAP[currentRow + 1]?.[currentCol] === '#') {
                direction = DIRECTION.LEFT;
            } else {
                currentRow++;
            }
        }

        if (direction === DIRECTION.LEFT) {
            if (LAB_MAP[currentRow]?.[currentCol - 1] === '#') {
                direction = DIRECTION.UP;
            } else {
                currentCol--;
            }
        }
    }

    return VISITED.size;
}

export function partTwo(): number {
    let direction = DIRECTION.UP;
    let currentRow = STARTING_ROW;
    let currentCol = STARTING_COLUMN;
    const height = LAB_MAP.length;
    const width = LAB_MAP[0].length;

    while (currentRow >= 0 && currentRow < height && currentCol >= 0 && currentCol < width) {
        VISITED.add(pairUnsigned([currentRow, currentCol]));

        if (direction === DIRECTION.UP) {
            if (LAB_MAP[currentRow - 1]?.[currentCol] === '#') {
                direction = DIRECTION.RIGHT;
            } else {
                currentRow--;
            }
        } else if (direction === DIRECTION.RIGHT) {
            if (LAB_MAP[currentRow]?.[currentCol + 1] === '#') {
                direction = DIRECTION.DOWN;
            } else {
                currentCol++;
            }
        } else if (direction === DIRECTION.DOWN) {
            if (LAB_MAP[currentRow + 1]?.[currentCol] === '#') {
                direction = DIRECTION.LEFT;
            } else {
                currentRow++;
            }
        } else if (direction === DIRECTION.LEFT) {
            if (LAB_MAP[currentRow]?.[currentCol - 1] === '#') {
                direction = DIRECTION.UP;
            } else {
                currentCol--;
            }
        }
    }

    VISITED.delete(pairUnsigned([STARTING_ROW, STARTING_COLUMN]));

    let counter = 0;

    VISITED.forEach((field) => {
        const [fieldRow, fieldCol] = unpairUnsigned(field);

        direction = DIRECTION.UP;
        currentRow = STARTING_ROW;
        currentCol = STARTING_COLUMN;

        const currentPath = new Set<number>();

        while (currentRow >= 0 && currentRow < height && currentCol >= 0 && currentCol < width) {
            const currentNode = pairUnsigned([pairUnsigned([currentRow, currentCol]), direction]);

            if (currentPath.has(currentNode)) {
                counter++;
                break;
            }

            currentPath.add(currentNode);

            if (direction === DIRECTION.UP) {
                if ((currentRow - 1 === fieldRow && currentCol === fieldCol) || LAB_MAP[currentRow - 1]?.[currentCol] === '#') {
                    direction = DIRECTION.RIGHT;
                } else {
                    currentRow--;
                }
            } else if (direction === DIRECTION.RIGHT) {
                if ((currentRow === fieldRow && currentCol + 1 === fieldCol) || LAB_MAP[currentRow]?.[currentCol + 1] === '#') {
                    direction = DIRECTION.DOWN;
                } else {
                    currentCol++;
                }
            } else if (direction === DIRECTION.DOWN) {
                if ((currentRow + 1 === fieldRow && currentCol === fieldCol) || LAB_MAP[currentRow + 1]?.[currentCol] === '#') {
                    direction = DIRECTION.LEFT;
                } else {
                    currentRow++;
                }
            } else if (direction === DIRECTION.LEFT) {
                if ((currentRow === fieldRow && currentCol - 1 === fieldCol) || LAB_MAP[currentRow]?.[currentCol - 1] === '#') {
                    direction = DIRECTION.UP;
                } else {
                    currentCol--;
                }
            }
        }
    });

    return counter;
}
