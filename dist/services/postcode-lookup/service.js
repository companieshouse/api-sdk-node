"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mapping_1 = __importDefault(require("../../mapping/mapping"));
class PostcodeLookupService {
    constructor(client) {
        this.client = client;
    }
    isValidUKPostcode(postcodeValidationUrl, postcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${postcodeValidationUrl}/${postcode}`;
            return this.getValidatePostcodeLookupResponse(url);
        });
    }
    getListOfValidPostcodeAddresses(postcodeAddressesLookupUrl, postcode) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${postcodeAddressesLookupUrl}/${postcode}`;
            return this.getPostcodeAddressesLookup(url);
        });
    }
    getValidatePostcodeLookupResponse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(url);
            return resp.status === 200;
        });
    }
    getPostcodeAddressesLookup(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(url);
            if (resp.status !== 200) {
                return { httpStatusCode: resp.status, resource: {} };
            }
            const resource = { httpStatusCode: resp.status, resource: null };
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = PostcodeLookupService;
//# sourceMappingURL=service.js.map