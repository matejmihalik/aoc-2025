import { readFileSync } from 'fs';

import { ContentReader } from './ContentReader';

export class InputReader extends ContentReader {
    constructor(inputFilePath: string) {
        const inputFileContent = readFileSync(inputFilePath, 'utf-8');
        super(inputFileContent);
    }

    readAsJson(): Record<string, unknown> {
        return JSON.parse(this.readAsString());
    }

    readAsSections(): ContentReader[] {
        return this.readAsString()
            .split('\n\n')
            .map((sectionContent) => new ContentReader(sectionContent));
    }
}
