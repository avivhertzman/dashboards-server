import { ChartService } from "../services/chartService";
import { ChartToCreate } from "../../core/objects/ChartToCreate";

const chartService = new ChartService();
async function createChart(req, res) {
    if (req.body && req.body.chart) {
        try {
            let chart: ChartToCreate = req.body.chart;
            await chartService.createChart(chart);
        }
        catch (e) {
            res.status(e.statusCode).send({
                message: `an error has occurred because of ${e.error}`
            })
        }
    }
}

    export { createChart }