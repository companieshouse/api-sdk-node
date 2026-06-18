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
  - Reason: Required as a transitive dependency by mocha@11.7.2, which depends on vulnerable version 6.0.2.
  - Ticket/CVE: CVE-2026-34043
  - Remove after: Remove once Mocha has been upgraded beyond version 11.7.2 (patch or minor release). Ensure proper testing is completed after removal.

- "uuid": "^11.1.1"
  - Reason: transitive dependency of istanbul-lib-processinfo / nyc
  - Ticket: ASM-2299 ( gulnerability GHSA-w5hq-g745-h8pq )

- **js-yaml@4.2.0**
  - Reason: Required as a transitive dependency by @istanbuljs/load-nyc-config@1.1.0, which depends on vulnerable version 3.13.1.
  - Ticket/CVE: CVE-2026-53550 ( vulnerability GHSA-h67p-54hq-rp68 )
  - Remove after: Remove once load-nyc-config has been upgraded beyond version 1.1.0 (patch or minor release). Ensure proper testing is completed after removal.

