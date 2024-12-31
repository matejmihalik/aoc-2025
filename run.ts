import { readdirSync } from 'fs';
import { join } from 'path';
import select from '@inquirer/select';

let [, , year, day] = process.argv;

function numericalSort(a: string, b: string): number {
    return Number(b) - Number(a);
}

function getNumericalSubdirectories(parentDirectoryPath: string): string[] {
    return readdirSync(parentDirectoryPath, { withFileTypes: true })
        .reduce<string[]>((directories, directoryEntry) => {
            if (!directoryEntry.isDirectory()) {
                return directories;
            }

            if (!Number(directoryEntry.name)) {
                return directories;
            }

            return [...directories, directoryEntry.name];
        }, [])
        .sort(numericalSort);
}

function mapValueToSelectChoice<T>(value: T): { value: T } {
    return { value };
}

function getCurrentTimestamp(): number {
    return performance.now();
}

function formatTimestamp(timestamp: number): string {
    return timestamp.toLocaleString('en-GB', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    });
}

year ??= await select({
    loop: false,
    message: 'Select year',
    choices: getNumericalSubdirectories('src').map(mapValueToSelectChoice),
});

day ??= await select({
    loop: false,
    message: 'Select day',
    choices: getNumericalSubdirectories(join('src', year)).map(mapValueToSelectChoice),
});

const { partOne, partTwo } = await import(join('#src', year, day.padStart(2, '0'), 'main.ts'));

if (partOne) {
    const startTimestamp = getCurrentTimestamp();
    const solution = partOne();
    const endTimestamp = getCurrentTimestamp();

    console.log(`Part one: ${solution}`);
    console.log(`Time in ms: ${formatTimestamp(endTimestamp - startTimestamp)}`);
}

if (partTwo) {
    const startTimestamp = getCurrentTimestamp();
    const solution = partTwo();
    const endTimestamp = getCurrentTimestamp();

    console.log(`Part two: ${solution}`);
    console.log(`Time in ms: ${formatTimestamp(endTimestamp - startTimestamp)}`);
}
