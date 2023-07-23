import * as express from 'express';
import { createChart } from "../controllers/chartController";

const chartRouter = express.Router();

chartRouter.post('/chart', createChart)

export default chartRouter;