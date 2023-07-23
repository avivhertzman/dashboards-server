import { elasticAcessor } from "../elasticAccessor/elasticAccessor";
import { ChartToCreate } from "../../core/objects/ChartToCreate";

export class ChartService {
    constructor() {

    }

    async createChart(chart: ChartToCreate) {
        await elasticAcessor.createChart(chart);
    }

}