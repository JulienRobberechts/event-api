# Inato - clinical trial tool

## Purpose

This repository contains my code for the (senior-take-home-test)[https://github.com/inato/senior-take-home-test] by INATO.

## Setup

1. Initialize packages by running

```
yarn
```

2. Start the project

```
yarn start
```

## Technical choices

## Monorepo with Yarn Workspaces

I've chosen to use a monorepo because it's a clean structure to group multiple project in a single version control repository. It allows having clean boundaries as multiple repo but at the same time to get many benefits:

- To get a consistent view of all projects (for better code navigation, refactoring, local tests experience).
- To be able to make an atomic change on multiple packages.
- To reduce the need of configuration to manage versions (Yarn Workspaces do a lot of transparent work to optimize this)

In our company (40 dev/9 teams), the experience of monorepo (more than 100 packages for each part of the site) was really positive.
