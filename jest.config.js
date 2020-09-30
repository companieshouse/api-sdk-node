module.exports = {
  roots: [
    "<rootDir>"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/test.ts",
  ],
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globals: {
    "ts-jest": {
      diagnostics: false,
    }
  }
};
