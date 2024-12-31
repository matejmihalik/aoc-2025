export function conditionalCount<T>(
    items: T[],
    predicate: (item: T) => boolean = (item) => !!item,
): number {
    return items.filter(predicate).length;
}
