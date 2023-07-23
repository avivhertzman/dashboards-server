import ElasticAccessor from "../elasticAccessor/elasticAccessor";
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";

export class EventSchemaService {
    private elasticAcessor: ElasticAccessor;
    constructor() {
        this.elasticAcessor = new ElasticAccessor();
    }

    async getEventSchemaById(id: string) {
       let schema = await this.elasticAcessor.getEventSchemaById(id);
       return schema;
    }

    async createNewEventSchema(schema: EventSchemaToCreate) {
        await this.elasticAcessor.addSchema(schema);
    }

    async getEventSchemasIds() {
      let result = await this.elasticAcessor.getEventSchemas();
      let parsedResult = result.hits.hits.map(hit => hit._id)
      return parsedResult;
    }
}