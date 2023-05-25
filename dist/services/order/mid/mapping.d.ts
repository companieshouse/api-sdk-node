import { MidItemResource, MidItemPostRequest, MidItemRequestResource, MidItem } from "./types";
export default class MidMapping {
    static mapMidItemRequestToMidItemRequestResource(midItemRequest: MidItemPostRequest): MidItemRequestResource;
    static mapMidItemResourceToMidItem(body: MidItemResource): MidItem;
}
