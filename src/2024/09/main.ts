// --- Day 9: Disk Fragmenter ---
// https://adventofcode.com/2024/day/9
// https://www.reddit.com/r/adventofcode/comments/1ha27bo/2024_day_9_solutions

import { InputReader } from '#src/input';

const [, , , , input] = process.argv;

const DISK_MAP = new InputReader(input).readAsChars().map(Number);

export function partOne(): number {
    let blockIndex = -1;
    let checksum = 0;
    let headFileIndex = 0;
    let tailFileIndex = Math.ceil(DISK_MAP.length / 2) - 1;
    let tailFileRemainingSize = DISK_MAP[tailFileIndex * 2];

    DISK_MAP.some((digit, index) => {
        if (headFileIndex === tailFileIndex) {
            return true;
        }

        if (index % 2 === 1) {
            let freeBlocks = digit;

            while (freeBlocks) {
                blockIndex++;
                freeBlocks--;
                tailFileRemainingSize--;
                checksum += tailFileIndex * blockIndex;
                // console.log(tailFileIndex, blockIndex, tailFileIndex * blockIndex);

                if (!tailFileRemainingSize) {
                    tailFileIndex--;
                    tailFileRemainingSize = DISK_MAP[tailFileIndex * 2];
                }

                if (tailFileIndex === headFileIndex) {
                    return true;
                }
            }

            return false;
        }

        headFileIndex = index / 2;

        let headFileRemainingSize = digit;

        if (headFileIndex === tailFileIndex) {
            headFileRemainingSize = tailFileRemainingSize;
        }

        for (let i = blockIndex + 1; i <= blockIndex + headFileRemainingSize; i++) {
            // console.log(headFileIndex, i, headFileIndex * i);
            checksum += headFileIndex * i;
        }

        blockIndex += headFileRemainingSize;

        return headFileIndex === tailFileIndex;
    });

    return checksum;
}

export function partTwo(): number {
    function getSequenceLength(array: number[], index: number) {
        const sequence = array[index];
        let count = 0;

        while (array[index + count] === sequence) {
            count++;
        }

        return count;
    }

    const compacted = DISK_MAP.flatMap((block, index) =>
        Array(block).fill(index % 2 === 0 ? index / 2 : '.'),
    );

    for (let block = Math.ceil(DISK_MAP.length / 2) - 1; block >= 0; block--) {
        const blockIndex = compacted.indexOf(block);
        const sequenceLength = getSequenceLength(compacted, blockIndex);

        for (let compactedIndex = 0; compactedIndex < blockIndex; compactedIndex++) {
            if (compacted[compactedIndex] === '.' && getSequenceLength(compacted, compactedIndex) >= sequenceLength) {
                compacted.splice(blockIndex, sequenceLength, ...Array(sequenceLength).fill('.'));
                compacted.splice(compactedIndex, sequenceLength, ...Array(sequenceLength).fill(block));
                break;
            }
        }
    }

    return compacted.reduce((checksum, block, index) => {
        return block === '.' ? checksum : checksum + block * index;
    }, 0);
}
