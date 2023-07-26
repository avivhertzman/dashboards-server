import { elasticAcessor } from "../elasticAccessor/elasticAccessor";
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";

export class EventSchemaService {
    constructor() {
    }

    async getEventSchemaById(id: string) {
        let schema = await elasticAcessor.getEventSchemaById(id);
        return schema._source;
    }

    async createEventSchema(schema: EventSchemaToCreate) {
        let result = await elasticAcessor.createSchema(schema);
        return {name: result._id};
    }

    async getEventSchemasIds() {
        let result = await elasticAcessor.getEventSchemas();
        let parsedResult = result.hits.hits.map(hit => hit._id)
        return parsedResult;
    }
}