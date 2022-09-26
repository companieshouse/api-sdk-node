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
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    constructor(client) {
        this.client = client;
    }
    refresh(refreshToken, grantType, clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `/oauth2/token?grant_type=${grantType}&refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}`;
            const params = {
                refresh_token: refreshToken,
                grant_type: grantType,
                client_id: clientId,
                client_secret: clientSecret
            };
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.log(url);
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            const response = yield this.client.httpPost(url, {});
            if (response.error) {
                return {
                    httpStatusCode: response.status,
                    errors: [response.error]
                };
            }
            const resource = {
                httpStatusCode: response.status
            };
            resource.resource = Object.assign({}, response.body);
            return resource;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=service.js.map