import { LimitedPartnership, LimitedPartnershipResource } from "./types";

export const mapLimitedPartnership = (body: LimitedPartnership): LimitedPartnershipResource => {
    return {
        data: {
            partnership_name: body.data?.partnership_name,
            name_ending: body.data?.name_ending
        }
    };
};
