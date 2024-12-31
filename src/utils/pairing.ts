type Pair = [x: number, y: number];

export function pairUnsigned([x, y]: Pair): number {
    return x >= y ? x ** 2 + x + y : y ** 2 + x;
}

export function unpairUnsigned(z: number): Pair {
    const q = Math.floor(Math.sqrt(z));
    const l = z - q ** 2;

    return l < q ? [l, q] : [q, l - q];
}

export function pairSigned(pair: Pair): number {
    const unsignedPair = pair.map((value) => (value >= 0 ? value * 2 : value * -2 - 1)) as Pair;
    return pairUnsigned(unsignedPair);
}

export function unpairSigned(z: number): Pair {
    const unsignedPair = unpairUnsigned(z);
    return unsignedPair.map((value) => (value % 2 ? (value + 1) / -2 : value / 2)) as Pair;
}
