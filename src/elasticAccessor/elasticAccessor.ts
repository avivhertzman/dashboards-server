import { Client } from '@elastic/elasticsearch';
import config from 'config';

export default class ElasticAccessor {
    private client;
    constructor() {
        this.client = new Client({
            cloud: { id: config.get('elastic.cloudId') },
            auth: { apiKey: config.get('elastic.apiKey') }
        })
    }
   async getEventSchemaById(id: string) {
        let schema = await this.client.get({ index: 'event_schemas', id })
        return schema;
    }


    addSchema() {
        // await client.index({
        //     index: 'event_schemas', id: 'first_schema', document: {
        //         "$id": "https://example.com/person.schema.json",
        //         "$schema": "https://json-schema.org/draft/2020-12/schema",
        //         "title": "Person",
        //         "type": "object",
        //         "properties": {
        //             "firstName": {
        //                 "type": "string",
        //                 "description": "The person's first name."
        //             },

        //         }
        //     } }
        //     );
        const b = this.client.get({ index: 'event_schemas', id: 'first_schema' })
        console.log(b);
    }
}