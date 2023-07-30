import  { ChartService }  from "../services/chartService";
import { Chart } from "../../core/objects/chart";
import handleError from "../utils/errorHandler";


const chartService = new ChartService();
async function createChart(req, res) {
    if (req.body && req.body.chart) {
        try {
            let chart: Chart = req.body.chart;
            await chartService.createChart(chart);
            let aggResult = await chartService.getAggregations([chart])
            res.send(aggResult);
        }
        catch (error) {
            handleError(error, res);
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
        handleError(error, res);
    }
}



export { createChart, getChartAggregations }