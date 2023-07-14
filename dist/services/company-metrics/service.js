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
class CompanyMetricsService {
    constructor(client) {
        this.client = client;
    }
    /**
    * Get the metrics for a company.
    *
    * @param number the company number to look up
    */
    getCompanyMetrics(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.httpGet(`/company/${number}/metrics`);
            const resource = {
                httpStatusCode: resp.status
            };
            if (resp.error) {
                return resource;
            }
            // cast the response body to the expected type
            const body = resp.body;
            //         const counts = body.counts as CountsApiResource;
            //
            //         const pscs = counts.persons-with-significant-control as PscApiResource;
            //         const app = counts.appointments as AppointmentsApiResource;
            //
            //         const mortgage = body.mortgage as MortgageApiResource;
            //
            //         const registers = body.registers as RegistersApiResource;
            //
            //         const directorsRegister = registers.directors as RegisterApiResource;
            //         const membersRegister = registers.members as RegisterApiResource;
            //         const secretariesRegister = registers.secretaries as RegisterApiResource;
            //         const uraRegister = registers.usual_residential_address as RegisterApiResource;
            //         const pscsRegister = registers.persons_with_significant_control as RegisterApiResource;
            //         const llpMemRegister = registers.llp_members as RegisterApiResource;
            //         const llpUraRegister = registers.llp_usual_residential_address as RegisterApiResource;
            //
            //         resource.resource = {
            //             etag: body.etag,
            //             counts: {
            //                 personsWithSignificantControl: {
            //                     statementsCount: pscs.statements_count;
            //                     ceasedPscsCount: pscs.ceased_pscs_count;
            //                     totalCount: pscs.total_count;
            //                     activePscsCount: pscs.active_pscs_count;
            //                     withdrawnStatementsCount: pscs.withdrawn_statements_count;
            //                     activeStatementsCount: pscs.active_statements_count;
            //                     pscsCount: pscs.pscs_count;
            //                 },
            //                 appointments: {
            //                     activeDirectorsCount: app.active_directors_count;
            //                     activeSecretariesCount: app.active_secretaries_count;
            //                     activeCount: app.active_count;
            //                     resignedCount: app.resigned_count;
            //                     totalCount: app.total_count;
            //                     activeLlpMembersCount: app.active_llp_members_count;
            //                 },
            //             },
            //             mortgage: {
            //                 satisfiedCount: mortgage.satisfied_count;
            //                 partSatisfiedCount: mortgage.part_satisfied_count;
            //                 totalCount: mortgage.total_count;
            //             },
            //             registers: {
            //                 directors: {
            //                     registerMovedTo: directorsRegister.register_moved_to;
            //                     movedOn: directorsRegister.moved_on;
            //                 },
            //                 members: {
            //                     registerMovedTo: membersRegister.register_moved_to;
            //                     movedOn: membersRegister.moved_on;
            //                 },
            //                 secretaries: {
            //                     registerMovedTo: secretariesRegister.register_moved_to;
            //                     movedOn: secretariesRegister.moved_on;
            //                 },
            //                 usual_residential_address: {
            //                     registerMovedTo: uraRegister.register_moved_to;
            //                     movedOn: uraRegister.moved_on;
            //                 },
            //                 persons_with_significant_control: {
            //                     registerMovedTo: pscsRegister.register_moved_to;
            //                     movedOn: pscsRegister.moved_on;
            //                 },
            //                 llp_members: {
            //                     registerMovedTo: llpMemRegister.register_moved_to;
            //                     movedOn: llpMemRegister.moved_on;
            //                 },
            //                 llp_usual_residential_address: {
            //                     registerMovedTo: llpUraRegister.register_moved_to;
            //                     movedOn: llpUraRegister.moved_on;
            //                 },
            //             }
            //         };
            resource.resource = mapping_1.default.camelCaseKeys(body);
            return resource;
        });
    }
}
exports.default = CompanyMetricsService;
//# sourceMappingURL=service.js.map