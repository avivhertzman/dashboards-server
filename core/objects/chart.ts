import { CharType } from "../enum/charType";

export class Chart {
    schemaId: string;
    schemaProperty?: string;
    schemaPropertyType?: string;
    interval?: string;
    chartType: CharType;
}