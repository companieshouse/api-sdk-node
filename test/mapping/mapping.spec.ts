import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import Mapping from "../../src/mapping/mapping";

describe("mapping", () => {
    describe("camelCaseKeys", () => {
        it("should handle an object containing one snake case item", () => {
            const input = { foo_bar: "foo" };
            const expectedResult = { fooBar: "foo" };
            const result = Mapping.camelCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });

        it("should handle an object containing multiple snake case items", () => {
            const input = { foo_bar: "foo", bob: "bob", chicken_nuggets: true };
            const expectedResult = { fooBar: "foo", bob: "bob", chickenNuggets: true };
            const result = Mapping.camelCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });

        it(
            "should handle an object containing nested multiple snake case items",
            () => {
                const input = { foo_bar: true, obj: { one_two: false, arr: [{ three_four: true }] } };
                const expectedResult = { fooBar: true, obj: { oneTwo: false, arr: [{ threeFour: true }] } };
                const result = Mapping.camelCaseKeys(input);

                expect(result).toEqual(expectedResult);
            }
        );

        it("should handle an object containing nested snake case arrays", () => {
            const input = { foo_bar_bob: [["a", "b"]] };
            const expectedResult = { fooBarBob: [["a", "b"]] };
            const result = Mapping.camelCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });
    });

    describe("snakeCaseKeys", () => {
        it("should handle an object containing one camel case item", () => {
            const input = { fooBar: "foo" };
            const expectedResult = { foo_bar: "foo" };
            const result = Mapping.snakeCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });

        it("should handle an object containing multiple camel case items", () => {
            const input = { fooBar: "foo", bob: "bob", chickenNuggets: true };
            const expectedResult = { foo_bar: "foo", bob: "bob", chicken_nuggets: true };
            const result = Mapping.snakeCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });

        it(
            "should handle an object containing nested multiple camel case items",
            () => {
                const input = { fooBar: true, obj: { oneTwo: false, arr: [{ threeFour: true }] } };
                const expectedResult = { foo_bar: true, obj: { one_two: false, arr: [{ three_four: true }] } };
                const result = Mapping.snakeCaseKeys(input);

                expect(result).toEqual(expectedResult);
            }
        );

        it("should handle an object containing nested camel case arrays", () => {
            const input = { fooBarBob: [["a", "b"]] };
            const expectedResult = { foo_bar_bob: [["a", "b"]] };
            const result = Mapping.snakeCaseKeys(input);

            expect(result).toEqual(expectedResult);
        });
    });
});
