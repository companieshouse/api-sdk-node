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
/**
 * TODO: javadoc
 */
class CompanyAppointmentsService {
    constructor(client) {
        this.client = client;
    }
    /**
     * TODO: Javadoc
     * @param companyNumber
     * @param appointmentId
     * @returns
     */
    getCompanyAppointmentFullRecord(companyNumber, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `/company/${companyNumber}/appointments/${appointmentId}/full_record`;
            console.log("url = " + url);
            const resp = yield this.client.httpGet(url);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            const body = resp.body;
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = CompanyAppointmentsService;
//# sourceMappingURL=service.js.map