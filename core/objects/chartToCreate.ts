import { CharType } from "../enum/charType";

export class ChartToCreate {
    schemaId: string;
    schemaProperty?: string;
    interval?: string;
    chartType: CharType;
}