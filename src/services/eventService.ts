import { elasticAcessor } from "../elasticAccessor/elasticAccessor";
import { format } from 'date-fns';

const DATE_TIME_FORMAT = 'mm/dd/yy hh:mm:ss';

export class EventService {

    constructor() {
    }

    createEvent(event: any) {
        let date = format(new Date(), DATE_TIME_FORMAT);
        event['timestamp'] = date;
        elasticAcessor.createEvent(event);
    }
}