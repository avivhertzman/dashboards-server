import * as express from 'express';
import {createEvent } from "../controllers/eventController";

const eventRouter = express.Router();

eventRouter.post('/event', createEvent);

export default eventRouter;