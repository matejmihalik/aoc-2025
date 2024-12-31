// --- Day 7: Bridge Repair ---
// https://adventofcode.com/2024/day/7
// https://www.reddit.com/r/adventofcode/comments/1h8l3z5/2024_day_7_solutions

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

function parseEquation(rawEquation: string): number[] {
    return (rawEquation.match(/\d+/g) ?? []).map(Number);
}

const EQUATIONS = new InputReader(input).readAsLines(parseEquation);

const calculateAllOperandCombinations = (
    [currentOperand, ...otherOperands]: number[],
    part2 = false,
): number[] => {
    if (!otherOperands.length) {
        return [currentOperand];
    }

    const combinations: number[] = [];
    const subCombinations = calculateAllOperandCombinations(otherOperands, part2);

    subCombinations.forEach((operand) => {
        combinations.push(operand + currentOperand);
        combinations.push(operand * currentOperand);
        if (part2) {
            combinations.push(Number(operand.toString() + currentOperand.toString()));
        }
    });

    return combinations;
};

export function partOne(): number {
    return EQUATIONS.reduce((possibleEquations, [result, ...operands]) => {
        const operandCombinations = calculateAllOperandCombinations(operands.reverse());

        if (operandCombinations.includes(result)) {
            return possibleEquations + result;
        }

        return possibleEquations;
    }, 0);
}

export function partTwo(): number {
    return EQUATIONS.reduce((possibleEquations, [result, ...operands]) => {
        const operandCombinations = calculateAllOperandCombinations(operands.reverse(), true);

        if (operandCombinations.includes(result)) {
            return possibleEquations + result;
        }

        return possibleEquations;
    }, 0);
}
