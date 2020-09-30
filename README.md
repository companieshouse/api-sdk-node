# Companies House SDK (Node)

This SDK abstract the calls to our public APIs.

## Quick start

Use NPM to install the SDK in your project;

    npm i git+ssh://git@github.com:companieshouse/api-sdk-node.git

Note that this install may need to be run with the 'sudo' command to avoid an error related to file permissions (and Sophos virus scanning).

The following snippet shows how to get up and running quickly using TypeScript.

```typescript

import {createApiClient} from "ch-sdk-node";

(async () => {
    const api = createApiClient("your-api-key");
    const profile = await api.companyProfile.getCompanyProfile("00006400");

    console.log(profile);
})()

```

There is an alternative way of calling some of the services, which forces you to check for errors. It borrows concepts from the Either class found in functional programming.
```typescript

import {createApiClient} from "ch-sdk-node";

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

To test the changes made to this sdk inside your project, you can use `npm link`.

From within this directory, run the following command to make symbolic links to it within the global node modules directory. 

    npm link

Then from within your local project, simply link it with the following command

    npm link ch-sdk-node

Note that if your local project is running within a Vagrant Virtual Machine, this command will need to be run on the VM.

## Testing

[Jest](https://jestjs.io) is the framework used in this project and all tests can be run using npm.

    npm t

To tun the tests with coverage, pass the `--coverage` flag on the command line.

    npm t -- --coverage

## Building a new version

When you want to release a new version, you first need to compile the TypeScript code.

    npm run build

This will output the generated JavaScript, Declaration files and Source Maps to the [dist](./dist) directory. The generated source code needs to be committed under version control as there is no internal npm registry yet.
