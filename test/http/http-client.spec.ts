import chai from "chai";
import { AbstractClient, HttpResponse } from "../../src/http";
const expect = chai.expect;

class TestClient extends AbstractClient {
    public httpPost (url: string, body: any): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }

    public httpPatch (url: string, body: any, headers: any): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }

    public httpDelete (url: string): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }

    public async httpGet (url: string): Promise<HttpResponse> {
        return { status: 200 };
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
