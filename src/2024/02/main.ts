// --- Day 2: Red-Nosed Reports ---
// https://adventofcode.com/2024/day/2
// https://www.reddit.com/r/adventofcode/comments/1h4ncyr/2024_day_2_solutions

import { InputReader } from '#src/input';
import { conditionalCount } from '#src/utils';

const [, , , , input] = process.argv;

type Direction = 'ascending' | 'descending';

const MIN_SAFE_LEVEL_DIFFERENCE = 1;
const MAX_SAFE_LEVEL_DIFFERENCE = 3;

function parseReport(report: string): number[] {
    return report.split(' ').map(Number);
}

const REPORTS = new InputReader(input).readAsLines(parseReport);

function calculateLevelDifference(
    previousLevel: number, currentLevel: number, direction: Direction,
): number {
    if (direction === 'ascending') {
        return currentLevel - previousLevel;
    }

    if (direction === 'descending') {
        return previousLevel - currentLevel;
    }

    return 0;
}

function findFirstUnsafeLevelIndex(report: number[], direction: Direction): number {
    return report.findIndex((currentLevel, currentLevelIndex) => {
        if (!currentLevelIndex) {
            return false;
        }

        const previousLevel = report[currentLevelIndex - 1];
        const levelDifference = calculateLevelDifference(previousLevel, currentLevel, direction);

        return levelDifference < MIN_SAFE_LEVEL_DIFFERENCE ||
            levelDifference > MAX_SAFE_LEVEL_DIFFERENCE;
    });
}

function isReportSafe(report: number[], isProblemDampenerAvailable = false): boolean {
    const firstLevel = report[0];
    const secondLevel = report[1];
    let firstUnsafeLevelIndex = 0;

    if (firstLevel < secondLevel) {
        firstUnsafeLevelIndex = findFirstUnsafeLevelIndex(report, 'ascending');
    }

    if (firstLevel > secondLevel) {
        firstUnsafeLevelIndex = findFirstUnsafeLevelIndex(report, 'descending');
    }

    if (firstUnsafeLevelIndex >= 0 && isProblemDampenerAvailable) {
        const modifiedReport = report.toSpliced(firstUnsafeLevelIndex, 1);

        if (firstUnsafeLevelIndex === 2) {
            const alternateModifiedReport1 = report.toSpliced(firstUnsafeLevelIndex - 1, 1);
            const alternateModifiedReport2 = report.toSpliced(firstUnsafeLevelIndex - 2, 1);
            return isReportSafe(modifiedReport) || isReportSafe(alternateModifiedReport1) || isReportSafe(alternateModifiedReport2);
        }

        const alternateModifiedReport = report.toSpliced(firstUnsafeLevelIndex - 1, 1);
        return isReportSafe(modifiedReport) || isReportSafe(alternateModifiedReport);
    }

    return firstUnsafeLevelIndex === -1;
}

export function partOne(): number {
    return conditionalCount(REPORTS, (report) => isReportSafe(report));
}

export function partTwo(): number {
    return conditionalCount(REPORTS, (report) => isReportSafe(report, true));
}
