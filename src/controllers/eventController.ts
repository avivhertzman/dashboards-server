import { EventService } from "../services/eventService";

const eventService = new EventService();

async function createEvent(req, res) {
    let event = req.body.event;
    try {
        await eventService.createEvent(event);
        res.send();
    }
    catch (e) {
        res.status(e.statusCode).send({
            message: `an error has occurred because of ${e.error}`
        })
    }
}

export {createEvent}