import ElasticAccessor from "../elasticAccessor/elasticAccessor";

export class EventSchemaService {
    private elasticAcessor: ElasticAccessor;
    constructor() {
        this.elasticAcessor = new ElasticAccessor();
    }

    async getEventSchemaById(id: string) {
       let schema = await this.elasticAcessor.getEventSchemaById(id);
       return schema;
    }
}