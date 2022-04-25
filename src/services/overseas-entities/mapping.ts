import { OverseasEntity } from "./types";

export const mapOverseasEntity = (body: OverseasEntity): OverseasEntity => {
    return {
        presenter: { ...body.presenter },
        entity: { ...body.entity },
        beneficial_owners_statement: body.beneficial_owners_statement,
        beneficial_owners_individual: { ...body.beneficial_owners_individual },
        beneficial_owners_corporate: { ...body.beneficial_owners_corporate },
        beneficial_owners_government_or_public_authority: { ...body.beneficial_owners_government_or_public_authority }
    };
};
