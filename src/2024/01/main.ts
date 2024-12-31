// --- Day 1: Historian Hysteria ---
// https://adventofcode.com/2024/day/1
// https://www.reddit.com/r/adventofcode/comments/1h3vp6n/2024_day_1_solutions

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

function parseLine(line: string): [number, number] {
    const [, leftValue, rightValue] = line.match(/^(?<leftValue>\d+)\s+(?<rightValue>\d+)$/) ?? [];
    return [Number(leftValue), Number(rightValue)];
}

const [LEFT_LIST, RIGHT_LIST] = new InputReader(input).readAsLines(parseLine)
    .reduce<[number[], number[]]>(([leftList, rightList], [leftLocationId, rightLocationId]) => {
        leftList.push(leftLocationId);
        rightList.push(rightLocationId);
        return [leftList, rightList];
    }, [[], []]);

export function partOne(): number {
    const sortedLeftList = LEFT_LIST.sort();
    const sortedRightList = RIGHT_LIST.sort();

    return sortedLeftList.reduce((totalDistance, leftLocationId, index) => {
        const rightLocationId = sortedRightList[index];
        const currentDistance = Math.abs(leftLocationId - rightLocationId);

        return totalDistance + currentDistance;
    }, 0);
}

function buildLocationFrequencyMap(list: number[]): Map<number, number> {
    return list.reduce((histogram, locationId) => {
        const currentHits = histogram.get(locationId) ?? 0;
        histogram.set(locationId, currentHits + 1);

        return histogram;
    }, new Map<number, number>());
}

export function partTwo(): number {
    const rightListFrequencyMap = buildLocationFrequencyMap(RIGHT_LIST);

    return LEFT_LIST.reduce((totalSimilarity, locationId) => {
        const rightListLocationFrequency = rightListFrequencyMap.get(locationId) ?? 0;
        const currentSimilarity = locationId * rightListLocationFrequency;

        return totalSimilarity + currentSimilarity;
    }, 0);
}
