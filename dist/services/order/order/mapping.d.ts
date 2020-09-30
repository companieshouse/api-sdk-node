import { Order, OrderResource } from "./types";
export default class OrderMapping {
    static mapOrderResourceToOrder(orderResource: OrderResource): Order;
    private static mapItemResourceToItem;
    private static removeEmptyObjects;
    private static mapItemOptionsResourceToItemOptions;
}
