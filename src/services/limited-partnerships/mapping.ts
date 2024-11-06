import { LimitedPartnership, LimitedPartnershipResource } from "./types";

export const mapLimitedPartnership = (body: LimitedPartnership): LimitedPartnershipResource => {
    return {
        name: body.name,
        name_ending: body.name_ending
    };
};
