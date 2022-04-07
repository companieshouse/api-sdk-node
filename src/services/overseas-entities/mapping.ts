import { OverseasEntity } from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntity => {
    return {
        presenter: { ...body.presenter },
        entity: { ...body.entity }
    };
};
