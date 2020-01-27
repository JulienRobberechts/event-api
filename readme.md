# Inato - clinical trial tool

## Purpose

This repository contains my code for the [senior-take-home-test](https://github.com/inato/senior-take-home-test) by INATO.

## Setup

### Initialize packages by running (at the root)

```
npm i
```

### Start the project

```
npm start
```

By default the project will run with the env var `SAMPLE_MODE` in the [server start script](.\packages\server\package.json) in order to test the application manually. In production, this var should be disabled.

### Launch/Install the command line locally

There are 2 options

- You can launch the command line locally

```
npm run cli
```

- OR you can install the package globally

```
npm i -g ./packages/clinato
```

### Test the server

- run the automatic tests (10 tests)

```
npm test
```

- In a browser: http://localhost:3033
- With [Rest Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) for VSCode you can use the [sample requests](.\packages\server\tests\manual\ongoingTrials.http) file.

4. Test the command line

Start the server THEN run one of those commands from any directory:

```
clinato
clinato -h
clinato list
clinato list -c FR
clinato list -c DE
clinato list -c france
```

The first one is a Question/Answer cli.

## Technical choices

## Monorepo with Yarn Workspaces

I've chosen to use a monorepo because it's a clean structure to group multiple project in a single version control repository. It allows having clean boundaries as multiple repo but at the same time to get many benefits:

- To get a consistent view of all projects (for better code navigation, refactoring, local tests experience).
- To be able to make an atomic change on multiple packages.
- To reduce the need of configuration to manage versions (Yarn Workspaces do a lot of transparent work to optimize this)

In our company (40 dev/9 teams), the experience of monorepo (more than 100 packages for each part of the site) was really positive.

I still use npm and not yarn as package manager (except workspaces) because I'm more used to.

## Express setup with express-generator

To generate the boilerplate code of a NodeJS Express server I used [express-generator](https://www.npmjs.com/package/express-generator) that give a clean structure (app.js, bin/www, public, /routes). After this setup I've added cross-env (because I'm on windows) and put the port to 3033 (just to not have conflicts with other projects locally).

## Test-driven development (TDD)

I've a TDD approach as follow:

1. Create an empty endpoint and controller. (could have been done afterwards as well)

![dummy controller](doc-resources/dummy-controller.png)

2. Create a tests on the controller

![controller tests](doc-resources/controller-tests.png)

3. Run the test and let them fail as expected

![Failing test](doc-resources/failing-test.png)

4. Implement the feature in the controller to fix the test
5. Run the test to check it passes. if not come back to the step 4.
6. Refactor the code if it's useful and check all tests are still passing.
7. Go back to step 2 to cover more use cases (happy path or errors).

## Http calls

I used Axios for http calls because it's less work, a better syntax and avoid some bugs.

## Testing strategy

I've used different strategy for tests:

### Controller tests

[Tests on the controller](.\packages\server\controllers\trials-controller.test.js) check only the controller logic in isolation. The adapter to the third party api is mocked with Jest.

### Route tests

[Tests on the route](.\packages\server\routes\ongoingTrials.test.js) check the full endpoint (route, controller, adapter). The http calls are mocked with the library nock.

### Manual tests

[sample requests](.\packages\server\tests\manual\ongoingTrials.http) can help to make some smoke tests.
