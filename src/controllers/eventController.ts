import { EventService } from "../services/eventService";

const eventService = new EventService();

async function createEvent(req, res) {
    let event = req.body.event;
    try {
        await eventService.createEvent(event);
        res.send();
    }
    catch (error) {
        res.status(error.statusCode || 500).send({
            message: `an error has occurred because of ${error.message}`
        })
    }
}

export {createEvent}