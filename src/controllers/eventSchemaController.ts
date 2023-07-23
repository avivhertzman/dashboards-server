import { EventSchemaService } from "../services/eventSchemaService";

const eventSchemaService = new EventSchemaService();

async function getEventSchemaById(req, res) {
    let id = req.params.id;
    try {
        let schema = await eventSchemaService.getEventSchemaById(id);
        res.send(schema);
    }
    catch (e) {
        res.status(e.statusCode).send({
            message: 'error because ' + e.error
        })
    }
}

export { getEventSchemaById }