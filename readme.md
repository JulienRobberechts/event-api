
[![Node.js CI](https://github.com/JulienRobberechts/event-api/workflows/Node.js%20CI/badge.svg)](https://github.com/JulienRobberechts/event-api/actions?query=workflow%3A%22Node.js+CI%22)

# Top festivals in the world - Events API - demo project

## Purpose

This is a demo project serving a selection of top festivals in the world.

![Festival burning man](./doc-resources/festival-burning-man.jpg)
Festival burning man (Nevada, United States)

### Requirements

Let's say that we already have access to a external API named OpenEventApi (represented by this [file](./packages/server/tests/mock/events-all.json), this API does not exist for real). We want to build a wrapper API around this third-party API in order to control the access and add filtering and data transformation features.

1. From the API, we want to be able to query a list of events

- filtered them by country, type and ongoing events.
- limited the content to a subset of fields: name, start_date, end_date, type, country.

2. To give access to experiences users to this API, we want to create a command-line interface.

### Stack

The project use the stack: REST endpoint with Node/Express for the API and the CLI.

## Setup the project

### Initialize packages by running (at the root)

```
yarn
```

yarn is used to build the root and all workspaces at the same time.

### Start the project

```
npm start
```

PS: you can use yarn as well

By default the project will run with the env var `SAMPLE_MODE` in the [server start script](./packages/server/package.json) in order to test the application manually. In production, this var should be disabled.

### Launch/Install the command line `event-cli` locally

Once you have started the server locally, you can run the CLI in an other shell.

There are 2 options

- You can launch the command line locally

  ```
  npm run cli
  ```

- OR you can install the package globally in order to use `event-cli` from any directory

  ```
  npm i -g ./packages/event-cli
  ```

### Test the server

- run the automatic tests

```
npm test
```

- In a browser: http://localhost:3033
- With [Rest Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for VSCode you can use the [sample requests](./packages/server/tests/manual/events.http) file.

1. Test the command line

Start the server THEN run one of those commands from any directory:

```
event-cli
event-cli -h
event-cli list
event-cli list -c USA
event-cli list -c ESP
event-cli list -c spain
```

The first one is a Question/Answer cli.

![harbin international ice and snow festival](./doc-resources/harbin.jpg)
Harbin International Ice and Snow Sculpture Festival (Heilongjiang, China)

## Technical choices

### Monorepo with Yarn Workspaces

I've chosen to use a monorepo because it's a clean structure grouping multiple projects in a single version control repository. It allows having clean boundaries like multiple repo but at the same time has many other benefits:

- To get a consistent view of all projects (for better code navigation, refactoring, local tests experience).
- To be able to make an atomic change on multiple packages.
- To reduce the need of configuration to manage versions (Yarn Workspaces do a lot of work to optimize this)

In our company (40 dev/9 teams), the experience of monorepo (more than 100 packages for each part of the site) was really positive.

### Express setup with express-generator

To generate the boilerplate code of a NodeJS Express server I used [express-generator](https://www.npmjs.com/package/express-generator) that gives a clean structure (app.js, bin/www, public, /routes). After this setup I've added cross-env (because I'm on windows) and put the port to 3033 (just to not have conflicts with other projects locally).

### Test-driven development (TDD)

I've used the following tdd approach:

1. Create an empty endpoint and controller. (could have been done afterwards as well)
2. Create a test on the controller
3. Run the test and let it fail as expected
4. Implement the feature in the controller to fix the test.
5. Run the test to check it passes. if not come back to the step 4.
6. Refactor the code if it's useful and check all tests are still passing.
7. Go back to step 2 to cover more use cases (happy path or errors).

### Http calls

I've used Axios for http calls because it's less work, a better syntax and avoids some bugs.

### Error management

On the server, the global error handling (handleValidationError and handleAllError) takes care of any Error raised in the business code (router, controllers, adapters).
With the addition of `wrapAsync` the business code doesn’t have to handle error management in asynchronous code. All errors will bubble up to the global error handlers.
Customs errors (like ConnectivityError) helps to carry some specific edge cases. ValidationError is not used but I keep it in the code to show how I would handle it.

### Testing strategy

I've used different strategies for tests.

#### Controller tests

[Tests on the controller](./packages/server/controllers/events-controller.test.js) check only the controller logic in isolation. The adapter to the OpenEventApi is injected in the constructor.

#### Route tests

[Tests on the route](./packages/server/routes/events.test.js) check the full endpoint (route, controller, adapter). The http calls are mocked with the library nock.

#### Manual tests

[sample requests](./packages/server/tests/manual/events.http) can be used for smoke tests.

### CLI runner

The CLI can be installed globally. It runs with commander to parse the command line and inquirer to give a nice interactive UI.

### Continuous integration

To run the test on each push I've setup the Github action 'Node.js CI'. It's a lightweight solution compared to Teamcity (but much less powerful).

## To go further

We could have also:

- created an API documentation with Swagger
- used TypeScript instead of Js
- developed a GraphQL server instead or on top of the REST API
- improved code coverage
- created unit tests in the cli

## Thank you!

![Festival burning man](./doc-resources/festival-burning-man-2.jpg)
