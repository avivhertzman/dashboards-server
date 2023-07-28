import * as express from 'express';
import { createChart, getChartAggregations } from "../controllers/chartController";

const chartRouter = express.Router();

chartRouter.post('/chart', createChart)

chartRouter.get('/chart/aggregations', getChartAggregations)

export default chartRouter;