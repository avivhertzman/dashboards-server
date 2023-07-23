import { EventSchemaService } from "../services/eventSchemaService";
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";

const eventSchemaService = new EventSchemaService();
// TODO: req validators
async function getEventSchemaById(req, res) {
    let id = req.params.id;
    try {
        let schema = await eventSchemaService.getEventSchemaById(id);
        res.send(schema);
    }
    catch (e) {
        res.status(e.statusCode).send({
            message: `an error has occurred because of ${e.error}`
        })
    }
}

async function createEventSchema(req, res) {
    let schema: EventSchemaToCreate = req.body.schemaRequest;
    try {
        await eventSchemaService.createEventSchema(schema);
        res.send();
    }
    catch (e) {
        res.status(e.statusCode).send({
            message: `an error has occurred because of ${e.error}`
        })
    }
}

async function getEventSchemas(req, res) {
    if (req.query && req.query.field === 'id') {
        try {
            let ids = await eventSchemaService.getEventSchemasIds();
            res.send(ids);
        }
        catch (e) {
            res.status(e.statusCode).send({
                message: `an error has occurred because of ${e.error}`
            })
        }
    }
    else {
        res.status(404).send({
            message: 'resource was not found'
        })
    }
}

export { getEventSchemaById, createEventSchema, getEventSchemas }