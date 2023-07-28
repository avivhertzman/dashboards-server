import { Client } from '@elastic/elasticsearch';
import config from 'config';
import { EventSchemaToCreate } from "../../core/objects/eventToSchemaCreate";
import { Chart } from "../../core/objects/chart";

// TODO: split this to many files
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
            index: this.schemasIndex, size: 100, query: {
                'match_all': {}
            }, 'stored_fields': []
        })
        return result;
    }

    async createSchema(eventSchemaToCreate: EventSchemaToCreate) {
        let createRequest = { index: this.schemasIndex, document: eventSchemaToCreate.schema };
        if (eventSchemaToCreate.name)
            createRequest["id"] = eventSchemaToCreate.name;
        let result = await this.client.index(
            createRequest
        );
        return result;
    }
    async createEvent(event: any) {
        return this.client.index({
            index: this.eventsIndex, document: event
        });
    }
    async createChart(chart: Chart) {
        return this.client.index({
            index: this.chartsIndex, document: chart
        });
    }
    async getAggregations(aggs) {
        return this.client.search({
            index: this.eventsIndex, size: 0, aggs
        })
    }
    async getCharts() {
        return this.getAllDocuments(this.chartsIndex);
    }
    async getAllDocuments(index: string) {
        return await this.client.search({
            index, size: 100, query: {
                'match_all': {}
            }
        })
    }
}

export const elasticAcessor = new ElasticAccessor();