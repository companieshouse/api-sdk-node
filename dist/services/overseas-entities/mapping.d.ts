import { OverseasEntity, OverseasEntityResource, OverseasEntityExtraDetails, BeneficialOwnerPrivateDataResource } from "./types";
export declare const mapOverseasEntity: (body: OverseasEntity) => OverseasEntityResource;
export declare const mapOverseasEntityResource: (body: OverseasEntityResource) => OverseasEntity;
export declare const mapOverseasEntityExtraDetails: (body: OverseasEntityExtraDetails) => OverseasEntityExtraDetails;
export declare const mapBeneficialOwnerPrivateData: (boPrivateData: BeneficialOwnerPrivateDataResource[]) => BeneficialOwnerPrivateDataResource[];
