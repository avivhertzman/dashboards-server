import { EventService } from "../services/eventService";
import handleError from "../utils/errorHandler";


const eventService = new EventService();

async function createEvent(req, res) {
    let event = req.body.event;
    try {
        await eventService.createEvent(event);
        res.send();
    }
    catch (error) {
        handleError(error, res);
    }
}

export {createEvent}