import { EventSchemaService } from "../services/eventSchemaService";
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";
import handleError from "../utils/errorHandler";

const eventSchemaService = new EventSchemaService();

async function getEventSchemaById(req, res) {
    let id = req.params.id;
    try {
        let schema = await eventSchemaService.getEventSchemaById(id);
        res.send(schema);
    }
    catch (error) {
        handleError(error, res);
    }
}

async function createEventSchema(req, res) {
    let schema: EventSchemaToCreate = req.body;
    try {
        let result = await eventSchemaService.createEventSchema(schema);
        res.send(result);
    }
    catch (error) {
        handleError(error, res);
    }
}

async function getEventSchemas(req, res) {
    if (req.query && req.query.field === 'id') {
        try {
            let ids = await eventSchemaService.getEventSchemasIds();
            res.send(ids);
        }
        catch (error) {
            handleError(error, res);
        }
    }
    else {
        res.status(404).send({
            message: 'resource was not found'
        })
    }
}

export { getEventSchemaById, createEventSchema, getEventSchemas }