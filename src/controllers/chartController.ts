import  { ChartService }  from "../services/chartService";
import { Chart } from "../../core/objects/chart";

const chartService = new ChartService();
async function createChart(req, res) {
    if (req.body && req.body.chart) {
        try {
            let chart: Chart = req.body.chart;
            await chartService.createChart(chart);
            let aggResult = await chartService.getAggregations([chart])
            res.send(aggResult);
        }
        catch (e) {
            res.status(e.statusCode).send({
                message: `an error has occurred because of ${e.message}`
            })
        }
    }
}

async function getChartAggregations(req, res) {
    try {
        let charts: Chart[] = await chartService.getCharts();
        let aggs = {};
        if (charts.length != 0)
            aggs = await chartService.getAggregations(charts);
        res.send(aggs);

    } catch (error) {
        res.status(error.statusCode || 500).send({
            message: `an error has occurred because of ${error.message}`
        })
    }
}



export { createChart, getChartAggregations }