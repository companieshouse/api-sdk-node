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
const chai_1 = __importDefault(require("chai"));
const http_1 = require("../../src/http");
const expect = chai_1.default.expect;
class TestClient extends http_1.AbstractClient {
    httpPost(url, body, headers) {
        throw new Error("Method not implemented.");
    }
    httpPatch(url, body, headers) {
        throw new Error("Method not implemented.");
    }
    httpPut(url, body, headers) {
        throw new Error("Method not implemented.");
    }
    httpDelete(url) {
        throw new Error("Method not implemented.");
    }
    httpGet(url, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return { status: 200 };
        });
    }
}
describe("abstract-client", () => {
    it("sets the correct authorization header when using api key", () => {
        const client = new TestClient({ baseUrl: "http://api", apiKey: "123" });
        expect(client.headers.Authorization).to.equal("123");
    });
    it("sends the correct authorization header when using oauth token", () => {
        const client = new TestClient({ baseUrl: "http://api", oauthToken: "123" });
        expect(client.headers.Authorization).to.equal("Bearer 123");
    });
});
//# sourceMappingURL=http-client.spec.js.map