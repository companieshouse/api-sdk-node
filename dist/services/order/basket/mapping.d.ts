import { BasketPatchRequest, BasketRequestResource } from "./types";
export default class BasketMapping {
    /**
     * Maps a request object to change delivery details to a corresponding resource request.
     * Note: required as Mapping.snakeCaseKeys does not insert underscores between letters and numbers.
     *
     * @param basketRequest A {@link BasketPatchRequest patch basket details} request object
     * @return BasketRequestResource An equivalent request entity with fields converted into snake case.
     */
    static mapBasketRequestToBasketRequestResource(basketRequest: BasketPatchRequest): BasketRequestResource;
}
