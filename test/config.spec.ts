import { expect } from "chai";

describe("Config", () => {
    let originalEnv: NodeJS.ProcessEnv;

    beforeEach(() => {
        originalEnv = { ...process.env };
        delete require.cache[require.resolve("../src/config")];
    });

    afterEach(() => {
        process.env = originalEnv;
        delete require.cache[require.resolve("../src/config")];
    });

    describe("ALPHABETICAL_SEARCH_PATH_URL", () => {
        it("should use default value when environment variable is not set", () => {
            delete process.env.ALPHABETICAL_SEARCH_PATH_URL;
            const config = require("../src/config");

            expect(config.ALPHABETICAL_SEARCH_PATH_URL).to.equal("/alphabetical-search/companies");
        });

        it("should use environment variable value when set", () => {
            process.env.ALPHABETICAL_SEARCH_PATH_URL = "/green/alphabetical-search/companies";
            const config = require("../src/config");

            expect(config.ALPHABETICAL_SEARCH_PATH_URL).to.equal("/green/alphabetical-search/companies");
        });

        it("should use environment variable even when set to empty string", () => {
            process.env.ALPHABETICAL_SEARCH_PATH_URL = "";
            const config = require("../src/config");

            expect(config.ALPHABETICAL_SEARCH_PATH_URL).to.equal("/alphabetical-search/companies");
        });
    });

});
