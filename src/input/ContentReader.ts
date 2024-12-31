export class ContentReader {
    #content: string;

    constructor(content: string) {
        this.#content = content;
    }

    readAsString(): string {
        return this.#content.trim();
    }

    readAsNumber(): number {
        return Number(this.readAsString());
    }

    readAsChars<T extends string>(): T[] {
        return this.readAsString().split('') as T[];
    }

    readAsComaSeparatedValues(): string[] {
        return this.readAsString().split(', ');
    }

    readAsLines(): string[];
    readAsLines<T>(transform: (line: string) => T): T[];
    readAsLines<T>(transform?: (line: string) => T): string[] | T[] {
        const lines = this.readAsString().split('\n');

        if (transform) {
            return lines.map(transform);
        }

        return lines;
    }

    readAsNumbers(): number[] {
        return this.readAsLines(Number);
    }

    readAsGrid<T extends string>(): T[][];
    readAsGrid<T>(cellTransform: (cellValue: string) => T): T[][];
    readAsGrid<T>(cellTransform?: (cellValue: string) => T): T[][] {
        return this.readAsLines((row) => {
            const rowCells = row.split('');

            if (cellTransform) {
                return rowCells.map(cellTransform);
            }

            return rowCells as T[];
        });
    }
}
