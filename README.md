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

To test the changes made to this sdk inside your project, you can use either `npm link` or modify the `prepare` script definition in your project's `package.json` file.

#### `npm link`

From within this directory, run the following command to make symbolic links to it within the global node modules directory. 

    npm link

Then from within your local project, simply link it with the following command

    npm link api-sdk-node

Note that if your local project is running within a Vagrant Virtual Machine, this command will need to be run on the VM.

#### `prepare` script

Change the definition of the `prepare` script in the package.json file to match the following, replacing `YOUR-BRANCH-NAME` with the name of the branch in the api-sdk-node repository that contains your changes:

    "prepare": "husky install && npm install --save https://github.com/companieshouse/api-sdk-node/tarball/YOUR-BRANCH-NAME && cd node_modules/@companieshouse/api-sdk-node && npm run build"

(The `husky install` command should only be present if already there in the `prepare` script definition of your project)

Once done it should just be necessary to restart your project's service in docker-chs-development (assumes that your local project is running in 'development mode').

Note that the `prepare` script change will need to be reverted, if wishing build and run unit-tests from the command-line, outside of the Docker environment. The change should NOT be committed or pushed to the project repository.

## Testing

[Jest](https://jestjs.io) is the framework used in this project and all tests can be run using npm.

    npm t

To tun the tests with coverage, pass the `--coverage` flag on the command line.

    npm t -- --coverage
