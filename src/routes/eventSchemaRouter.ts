import * as express from 'express';
import { getEventSchemaById } from "../controllers/eventSchemaController";

const eventSchemaRouter = express.Router();
eventSchemaRouter.get('/event-schemas/:id', getEventSchemaById);

export default eventSchemaRouter;