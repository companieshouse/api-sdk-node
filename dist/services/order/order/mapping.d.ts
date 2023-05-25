import { Order, OrderResource } from "./types";
import { MemberDetails } from "../certificates";
export default class OrderMapping {
    static mapOrderResourceToOrder(orderResource: OrderResource): Order;
    private static mapItemResourceToItem;
    private static removeEmptyObjects;
    private static mapItemOptionsResourceToItemOptions;
    static mapMemberDetails: (member_details: {
        include_address?: boolean;
        include_appointment_date?: boolean;
        include_basic_information?: boolean;
        include_country_of_residence?: boolean;
        include_dob_type?: string;
    }) => MemberDetails;
}
