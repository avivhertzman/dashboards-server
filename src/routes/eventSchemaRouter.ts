import * as express from 'express';
import { getEventSchemaById, createEventSchema, getEventSchemas } from "../controllers/eventSchemaController";

const eventSchemaRouter = express.Router();
eventSchemaRouter.get('/event-schema/:id', getEventSchemaById);
eventSchemaRouter.get('/event-schema', getEventSchemas);

eventSchemaRouter.post('/event-schema', createEventSchema);

export default eventSchemaRouter;