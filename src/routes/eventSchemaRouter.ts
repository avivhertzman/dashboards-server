import * as express from 'express';
import { getEventSchemaById, createNewEventSchema, getEventSchemas } from "../controllers/eventSchemaController";

const eventSchemaRouter = express.Router();
eventSchemaRouter.get('/event-schemas/:id', getEventSchemaById);
eventSchemaRouter.get('/event-schemas', getEventSchemas);

eventSchemaRouter.post('/event-schemas', createNewEventSchema);

export default eventSchemaRouter;