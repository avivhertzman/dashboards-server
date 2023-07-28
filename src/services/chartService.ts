import { elasticAcessor } from "../elasticAccessor/elasticAccessor";
import { Chart } from "../../core/objects/chart";
import { AggregationRequet } from "../../core/objects/aggregationRequest";
import { CharType } from "../../core/enum/charType";
import { AggregationType } from "../../core/enum/aggregationType";

export class ChartService {
  constructor() {
  }

  async createChart(chart: Chart) {
    return elasticAcessor.createChart(chart);
  }
  async getCharts(): Promise<Chart[]> {
    let chartsResponse = await elasticAcessor.getCharts();
    const parsedResult = chartsResponse.hits.hits.map((hit) => parsedHit(hit));
    return parsedResult;
  }
  async getAggregations(chart: Chart[]) {
    const aggBody = {};
    const aggToChartMapping = {};
    chart.forEach((chart: Chart) => {
      if (chart.chartType.toLocaleUpperCase() == CharType.Line) {
        aggBody[`timestamp_${chart.interval}`] = {
          date_histogram: {
            field: 'timestamp',
            fixed_interval: chart.interval
          }
        }
        aggToChartMapping[`timestamp_${chart.interval}`] = chart.chartType;
      }
      else {
        let fieldName = chart.schemaProperty;
        if (chart.schemaPropertyType == 'string') {
          fieldName += '.keyword'
        }
        aggBody[chart.schemaProperty] = {
          terms: {
            field: fieldName
          }
        }
        aggToChartMapping[chart.schemaProperty] = chart.chartType;
      }
    });
    let result = await elasticAcessor.getAggregations(aggBody);
    let mappedResult = parseAggregations(result.aggregations)
    return { aggregations: mappedResult, mapping: aggToChartMapping };
  }
}

//TODO: prettier function
function parsedHit(hit) {
  let source = hit._source;
  let result = {
    schemaProperty: source['schemaProperty'],
    chartType: source['chartType'],
    schemaPropertyType: source['schemaPropertyType']
  }
  let interval = source['interval'];
  if (interval) {
    result['interval'] = interval;
  }
  return result;
}

function parseAggregations(rawResult) {
  const mappedResult = [];
  Object.keys(rawResult).forEach((key) => {
    let bucketDict: { name: any, value: any }[] = [];
    rawResult[key]['buckets'].forEach((bucket: any) => {
      if (bucket.key && bucket.doc_count) {
        let keyVal;
        if (key.startsWith('timestamp')) {
          keyVal = { name: bucket.key_as_string, value: bucket.doc_count }
        }
        else {
          keyVal = { name: bucket.key, value: bucket.doc_count }
        }
        bucketDict.push(keyVal);
      }
    })
    mappedResult.push({ [key]: bucketDict })
  })
  return mappedResult;
}
