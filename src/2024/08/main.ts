// --- Day 8: Resonant Collinearity ---
// https://adventofcode.com/2024/day/8
// https://www.reddit.com/r/adventofcode/comments/1h9bdmp/2024_day_8_solutions

import { InputReader } from '#src/input';
import { pairUnsigned } from '#src/utils';

const [, , , , input] = process.argv;

const CITY_MAP = new InputReader(input).readAsGrid();

export function partOne(): number {
    const height = CITY_MAP.length;
    const width = CITY_MAP[0].length;
    const antinodes = new Set();
    const antennas = new Map<string, [number, number][]>();

    CITY_MAP.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            if (tile === '.') {
                return;
            }

            let alignedAntennas = antennas.get(tile);
            if (!alignedAntennas) {
                alignedAntennas = [];
                antennas.set(tile, alignedAntennas);
            }

            alignedAntennas.forEach(([antennaRow, antennaColumn]) => {
                const rowDiff = rowIndex - antennaRow;
                const colDiff = columnIndex - antennaColumn;

                const antiNode1Row = antennaRow - rowDiff;
                const antiNode1Col = antennaColumn - colDiff;

                const antiNode2Row = rowIndex + rowDiff;
                const antiNode2Col = columnIndex + colDiff;

                if (
                    0 <= antiNode1Row && antiNode1Row < height &&
                    0 <= antiNode1Col && antiNode1Col < width
                ) {
                    antinodes.add(pairUnsigned([antiNode1Row, antiNode1Col]));
                }

                if (
                    0 <= antiNode2Row && antiNode2Row < height &&
                    0 <= antiNode2Col && antiNode2Col < width
                ) {
                    antinodes.add(pairUnsigned([antiNode2Row, antiNode2Col]));
                }
            });

            alignedAntennas.push([rowIndex, columnIndex]);
        });
    });

    return antinodes.size;
}

export function partTwo(): number {
    const height = CITY_MAP.length;
    const width = CITY_MAP[0].length;
    const antinodes = new Set();
    const antennas = new Map<string, [number, number][]>();

    CITY_MAP.forEach((row, rowIndex) => {
        row.forEach((tile, columnIndex) => {
            if (tile === '.') {
                return;
            }

            let alignedAntennas = antennas.get(tile);
            if (!alignedAntennas) {
                alignedAntennas = [];
                antennas.set(tile, alignedAntennas);
            }

            alignedAntennas.forEach(([antennaRow, antennaColumn]) => {
                const rowDiff = rowIndex - antennaRow;
                const colDiff = columnIndex - antennaColumn;

                let antiNode1Row = antennaRow;
                let antiNode1Col = antennaColumn;

                let antiNode2Row = rowIndex;
                let antiNode2Col = columnIndex;

                while (
                    0 <= antiNode1Row && antiNode1Row < height &&
                    0 <= antiNode1Col && antiNode1Col < width
                ) {
                    antinodes.add(pairUnsigned([antiNode1Row, antiNode1Col]));
                    antiNode1Row -= rowDiff;
                    antiNode1Col -= colDiff;
                }

                while (
                    0 <= antiNode2Row && antiNode2Row < height &&
                    0 <= antiNode2Col && antiNode2Col < width
                ) {
                    antinodes.add(pairUnsigned([antiNode2Row, antiNode2Col]));
                    antiNode2Row += rowDiff;
                    antiNode2Col += colDiff;
                }
            });

            alignedAntennas.push([rowIndex, columnIndex]);
        });
    });

    return antinodes.size;
}
