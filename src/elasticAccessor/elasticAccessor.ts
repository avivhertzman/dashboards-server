import { Client } from '@elastic/elasticsearch';
import config from 'config';
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";
import {ChartToCreate} from "../../core/objects/ChartToCreate";

class ElasticAccessor {
    private client;
    private schemasIndex = config.get('elastic.indices.eventSchemas');
    private eventsIndex = config.get('elastic.indices.events');
    private chartsIndex = config.get('elastic.indices.charts');
    constructor() {
        this.client = new Client({
            cloud: { id: config.get('elastic.setUp.cloudId') },
            auth: { apiKey: config.get('elastic.setUp.apiKey') }
        })

    }
    async getEventSchemaById(id: string) {
        let schema = await this.client.get({ index: this.schemasIndex, id })
        return schema;
    }

    async getEventSchemas() {
        let result = await this.client.search({
            index: this.schemasIndex, query: {
                'match_all': {}
            }, 'stored_fields': []
        })
        return result;
    }

    async createSchema(eventSchemaToCreate: EventSchemaToCreate) {
        if (eventSchemaToCreate.name)
            await this.client.index({
                index: this.schemasIndex, document: eventSchemaToCreate.schema, id: eventSchemaToCreate.name
            });
        else {
            await this.client.index({
                index: this.schemasIndex, document: eventSchemaToCreate.schema
            });
        }
    }
    async createEvent(event: any) {
        await this.client.index({
            index: this.eventsIndex, document: event
        });
    }
    async createChart(chart: ChartToCreate) {
        await this.client.index({
            index: this.chartsIndex, document: chart
        });
    }
}

export const elasticAcessor = new ElasticAccessor();