# Inato - clinical trial tool

## Purpose

This repository contains my code for the (senior-take-home-test)[https://github.com/inato/senior-take-home-test] by INATO.

## Setup

1. Initialize packages by running (at the root)

```
npm i
```

2. Start the project

```
npm start
```

By default the project will run with the env var `SAMPLE_MODE` in the (server start script)[.\packages\server\package.json] in order to test the application manually. In production, this var should be disabled.

4. Install the command line locally

```
npm i -g ./packages/clinato
```

3. Test the server

- run the automatic tests (10 tests)

```
npm test
```

- In a browser: http://localhost:3033
- In [Rest Client Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client): (sample requests)[.\packages\server\tests\manual\ongoingTrials.http]

4. Test the command line

Run one of those command:

```
clinato -h
clinato list
clinato list -c FR
clinato list -c DE
```

## Technical choices

## Monorepo with Yarn Workspaces

I've chosen to use a monorepo because it's a clean structure to group multiple project in a single version control repository. It allows having clean boundaries as multiple repo but at the same time to get many benefits:

- To get a consistent view of all projects (for better code navigation, refactoring, local tests experience).
- To be able to make an atomic change on multiple packages.
- To reduce the need of configuration to manage versions (Yarn Workspaces do a lot of transparent work to optimize this)

In our company (40 dev/9 teams), the experience of monorepo (more than 100 packages for each part of the site) was really positive.

I still use npm and not yarn as package manager (except workspaces) because I'm more used to.

## Express setup with (express-generator)[https://www.npmjs.com/package/express-generator]

To generate the boilerplate code of a NodeJS Express server I used (express-generator)[https://www.npmjs.com/package/express-generator] that give a clean structure (app.js, bin/www, public, /routes). After this setup I've added cross-env (because I'm on windows) and put the port to 3033 (just to not have conflicts with other projects locally).

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

## third-party-api

I choose to create an other server to emulate the third party api to be able to test it close to the real use case (real Http call and not local data). But I could have done a mock of an HTTP call.

## Http calls

I used Axios for http calls because it's less work and a better syntax.

## Testing strategy
