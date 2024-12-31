// --- Day 4: Ceres Search ---
// https://adventofcode.com/2024/day/4
// https://www.reddit.com/r/adventofcode/comments/1h689qf/2024_day_4_solutions/

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

const CROSSWORD = new InputReader(input).readAsGrid();

function getMatchesAtPosition(
    currentCharacter: string,
    rowIndex: number,
    columnIndex: number,
): number {
    let acc = 0;

    if (currentCharacter !== 'X') {
        return acc;
    }

    if (CROSSWORD[rowIndex - 1]?.[columnIndex] === 'M') {
        if (CROSSWORD[rowIndex - 2]?.[columnIndex] === 'A') {
            if (CROSSWORD[rowIndex - 3]?.[columnIndex] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex + 1]?.[columnIndex] === 'M') {
        if (CROSSWORD[rowIndex + 2]?.[columnIndex] === 'A') {
            if (CROSSWORD[rowIndex + 3]?.[columnIndex] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex]?.[columnIndex - 1] === 'M') {
        if (CROSSWORD[rowIndex]?.[columnIndex - 2] === 'A') {
            if (CROSSWORD[rowIndex]?.[columnIndex - 3] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex]?.[columnIndex + 1] === 'M') {
        if (CROSSWORD[rowIndex]?.[columnIndex + 2] === 'A') {
            if (CROSSWORD[rowIndex]?.[columnIndex + 3] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex - 1]?.[columnIndex - 1] === 'M') {
        if (CROSSWORD[rowIndex - 2]?.[columnIndex - 2] === 'A') {
            if (CROSSWORD[rowIndex - 3]?.[columnIndex - 3] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex - 1]?.[columnIndex + 1] === 'M') {
        if (CROSSWORD[rowIndex - 2]?.[columnIndex + 2] === 'A') {
            if (CROSSWORD[rowIndex - 3]?.[columnIndex + 3] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex + 1]?.[columnIndex - 1] === 'M') {
        if (CROSSWORD[rowIndex + 2]?.[columnIndex - 2] === 'A') {
            if (CROSSWORD[rowIndex + 3]?.[columnIndex - 3] === 'S') {
                acc++;
            }
        }
    }

    if (CROSSWORD[rowIndex + 1]?.[columnIndex + 1] === 'M') {
        if (CROSSWORD[rowIndex + 2]?.[columnIndex + 2] === 'A') {
            if (CROSSWORD[rowIndex + 3]?.[columnIndex + 3] === 'S') {
                acc++;
            }
        }
    }

    return acc;
}

export function partOne(): number {
    return CROSSWORD.reduce((totalHits, row, rowIndex) =>
        totalHits + row.reduce((rowHits, currentCharacter, columnIndex) =>
            rowHits + getMatchesAtPosition(currentCharacter, rowIndex, columnIndex),
        0),
    0);
}

function getCrossMatchesAtPosition(
    currentCharacter: string,
    rowIndex: number,
    columnIndex: number,
) {
    let acc = 0;

    if (currentCharacter !== 'M') {
        return acc;
    }

    if (CROSSWORD[rowIndex - 1]?.[columnIndex + 1] === 'A') {
        if (CROSSWORD[rowIndex - 2]?.[columnIndex + 2] === 'S') {
            if (CROSSWORD[rowIndex]?.[columnIndex + 2] === 'M') {
                if (CROSSWORD[rowIndex - 2]?.[columnIndex] === 'S') {
                    acc++;
                }
            }
        }
    }

    if (CROSSWORD[rowIndex + 1]?.[columnIndex - 1] === 'A') {
        if (CROSSWORD[rowIndex + 2]?.[columnIndex - 2] === 'S') {
            if (CROSSWORD[rowIndex]?.[columnIndex - 2] === 'S') {
                if (CROSSWORD[rowIndex + 2]?.[columnIndex] === 'M') {
                    acc++;
                }
            }
        }
    }

    if (CROSSWORD[rowIndex + 1]?.[columnIndex + 1] === 'A') {
        if (CROSSWORD[rowIndex + 2]?.[columnIndex + 2] === 'S') {
            if (CROSSWORD[rowIndex]?.[columnIndex + 2] === 'M') {
                if (CROSSWORD[rowIndex + 2]?.[columnIndex] === 'S') {
                    acc++;
                }
            } else if (CROSSWORD[rowIndex]?.[columnIndex + 2] === 'S') {
                if (CROSSWORD[rowIndex + 2]?.[columnIndex] === 'M') {
                    acc++;
                }
            }
        }
    }

    return acc;
}

export function partTwo(): number {
    return CROSSWORD.reduce((totalHits, row, rowIndex) =>
        totalHits + row.reduce((rowHits, currentCharacter, columnIndex) =>
            rowHits + getCrossMatchesAtPosition(currentCharacter, rowIndex, columnIndex),
        0),
    0);
}
