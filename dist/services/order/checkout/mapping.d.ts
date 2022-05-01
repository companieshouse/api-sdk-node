import { Checkout, CheckoutResource } from "./types";
import { MemberDetails } from "../certificates";
export default class CheckoutMapping {
    static mapCheckoutResourceToCheckout(checkoutResource: CheckoutResource): Checkout;
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
