import { Client } from '@elastic/elasticsearch';
import config from 'config';
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";

export default class ElasticAccessor {
    private client;
    private index = config.get('elastic.indices.eventSchemas');
    constructor() {
        this.client = new Client({
            cloud: { id: config.get('elastic.setUp.cloudId') },
            auth: { apiKey: config.get('elastic.setUp.apiKey') }
        })

    }
    async getEventSchemaById(id: string) {
        let schema = await this.client.get({ index: this.index, id })
        return schema;
    }

    async getEventSchemas() {
        let result = await this.client.search({
            index: this.index, query: {
                'match_all': {}
            }, 'stored_fields': []
        })
        return result;
    }

    async addSchema(eventSchemaToCreate: EventSchemaToCreate) {
        if (eventSchemaToCreate.name)
            await this.client.index({
                index: 'event_schemas', document: eventSchemaToCreate.schema, id: eventSchemaToCreate.name
            });
        else {
            await this.client.index({
                index: 'event_schemas', document: eventSchemaToCreate.schema
            });
        }
    }
}