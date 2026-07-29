# Companies House SDK (Node)

This SDK abstract the calls to our public APIs.

Intended for use when making cross-web-service calls, supporting ERIC and the propagation of authentication details through to other services.

## Compatible Node versions

This package has been upgraded to be compatible with Node v24. Presently, it's backward compatible with v20 and v18 but compatibility is primarily required for v24 as all CH Node services are in the process of being upgraded to v24.

## Quick start

Use NPM to install the SDK in your project;

    npm i @companieshouse/api-sdk-node

Note that this install may need to be run with the 'sudo' command to avoid an error related to file permissions (and Sophos virus scanning).

The following snippet shows how to get up and running quickly using TypeScript.

```typescript

import {createApiClient} from "@companieshouse/api-sdk-node";

(async () => {
    const api = createApiClient("your-api-key");
    const profile = await api.companyProfile.getCompanyProfile("00006400");

    console.log(profile);
})()

```

There is an alternative way of calling some of the services, which forces you to check for errors. It borrows concepts from the Either class found in functional programming.
```typescript

import {createApiClient} from "@companieshouse/api-sdk-node";

(async () => {
    const api = createApiClient("your-api-key");
    const orderResult = await api.companyProfile.getOrder("an-existing-order-id");

    if(orderResult.isFailure()) {
        const errorResponse = orderResult.value;
        console.log(errorResponse);
    } else {
        const order = orderResult.value;
        console.log(order);
    }

})()

```

## Environment Variables

The SDK uses the following environment variables to configure the base URLs for each domain. All have production defaults and are optional.

| Variable | Default | Description |
|---|---|---|
| `API_URL` | `https://api.companieshouse.gov.uk` | Base URL for the Companies House API domain |
| `ACCOUNT_URL` | `https://account.companieshouse.gov.uk` | Base URL for the Companies House account domain |
| `PAYMENTS_API_URL` | `https://api-payments.company-information.service.gov.uk` | Base URL for the Companies House payments domain |

Consuming services should ensure `PAYMENTS_API_URL` is set appropriately in their environment configuration.

## Development

Once you have made changes to the library, you must validate against a service in Docker before merging your PR into main. Follow the guidance on the [Validating Library Changes Confluence page](https://companieshouse.atlassian.net/wiki/spaces/DEV/pages/6404931599/Validating+Library+Upgrades+with+Docker+Before+Merging ). Reach out to the Common Components teams if you have any questions.

> ⚠️ **Note (Informational Only)**
>
> The following instructions are retained for reference purposes only.
> They relate to testing changes made to this SDK within a local project.
>
> They may no longer work as expected and are **not actively maintained or supported**.

#### `npm link`

From within this directory, run the following command to create a symbolic link in the global node modules directory:

    npm link

Then from within your local project, simply link it with the following command

    npm link api-sdk-node

## Testing

[Jest](https://jestjs.io) is the framework used in this project and all tests can be run using npm.

    npm t

To tun the tests with coverage, pass the `--coverage` flag on the command line.

    npm t -- --coverage

### Dependency Overrides

- **serialize-javascript@7.0.5**
  - Reason: Required as a transitive dependency by mocha@11.7.6, which depends on vulnerable version 6.0.2.
  - Ticket/CVE: CVE-2026-34043
  - Remove after: Remove once Mocha has been upgraded beyond version 11.7.6 (patch or minor release). Ensure proper testing is completed after removal.

- **brace-expansion@5.0.8**
  - Reason:
      - Fixes vulnerable brace-expansion versions (2.0.1, and 1.1.7) that are transitive dependencies of `mocha` and `eslint-plugin-import`.
      - `mocha` latest depends on `glob@10.4.5 -> minimatch@9.0.5 -> brace-expansion@2.0.1`
      - `eslint-plugin-import` latest depends on `minimatch@3.1.5 -> brace-expansion@1.1.7`
      - `Glob` upgraded from 10.4.5 to 12.0.0 under mocha override to fix brace-expansion security vulnerabilities with updated dependencies
   - Mitigation:
      - general override is used to force `brace-expansion@5.0.8` for `mocha` and `eslint-plugin-import` dependency paths
      - Mocha override includes `glob@12.0.0` to pull in secure brace-expansion versions
      - The application test suite was executed successfully after applying the overrides
   - Risk:
      - This override spans multiple major versions (`1.x`/`2.x` -> `5.x`)
      - Compatibility is not guaranteed by npm and should be revalidated whenever related dependencies are upgraded
  - Ticket/CVE:
      - CVE-2026-13149
      - https://companieshouse.atlassian.net/browse/ASM-2687
  - Remove after:
      - Remove once mocha and eslint-plugin-import have been upgraded with versions using secure brace-expansion
      - Ensure proper testing is completed after removal


