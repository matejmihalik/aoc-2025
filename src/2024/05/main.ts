// --- Day 5: Print Queue ---
// https://adventofcode.com/2024/day/5
// https://www.reddit.com/r/adventofcode/comments/1h71eyz/2024_day_5_solutions/

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

type RuleMap = Map<number, number[]>;

const [RULES_SECTION, UPDATES_SECTION] = new InputReader(input).readAsSections();

function parseRule(rawRule: string): [number, number] {
    const [, firstPage, secondPage] =
        rawRule.match(/^(?<firstPage>\d+)\|(?<secondPage>\d+)$/) ?? [];

    return [Number(firstPage), Number(secondPage)];
}

const RULES = RULES_SECTION.readAsLines(parseRule).reduce<RuleMap>(
    (ruleMap, [firstPage, secondPage]) => {
        if (!ruleMap.has(firstPage)) {
            ruleMap.set(firstPage, []);
        }

        ruleMap.get(firstPage)?.push(secondPage);
        return ruleMap;
    },
    new Map(),
);

const UPDATES = UPDATES_SECTION.readAsLines((x) => x.split(',').map(Number));

function isUpdateCorrect(update: number[]) {
    return update.every((page, pageIndex) => {
        const followupPages = update.slice(pageIndex + 1);
        const pageRules = RULES.get(page);
        return followupPages.every((followupPage) =>
            pageRules?.includes(followupPage),
        );
    });
}

export function partOne(): number {
    const correct = UPDATES.filter(isUpdateCorrect);

    return correct.reduce((acc, x) => acc + x[Math.floor(x.length / 2)], 0);
}

export function partTwo(): number {
    const inCorrect = UPDATES.filter((update) => !isUpdateCorrect(update));

    const fixed = inCorrect.map((update) => update.sort((a, b) => (
        new Set(RULES.get(b) ?? []).intersection(new Set(update)).size
    ) - (
        new Set(RULES.get(a) ?? []).intersection(new Set(update)).size
    )));

    return fixed.reduce((acc, x) => acc + x[Math.floor(x.length / 2)], 0);
}
