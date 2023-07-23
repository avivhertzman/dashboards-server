import { elasticAcessor } from "../elasticAccessor/elasticAccessor";

export class EventService {
    constructor() {
    }

    createEvent(event: any) {
        elasticAcessor.createEvent(event);

    }

}