# Node-Starter-TS

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
![GitHub issues](https://img.shields.io/github/issues/okanaslan/Typescript-Node-Starter)
![GitHub package.json version](https://img.shields.io/github/package-json/v/okanaslan/Typescript-Node-Starter)
![GitHub last commit](https://img.shields.io/github/last-commit/okanaslan/Typescript-Node-Starter)

Node.js starter package written in Typescript.

#### Features

-   Code quality:
    -   Pre-commit hook:
        -   ESLint check
        -   Prettier formatting
    -   Auto generated OpenApi-3 documentation
        -   ts-json-schema-generator: converts interfaces into JSON Schema Docs.
        -   openapi3-ts: enables writing type safe docs.
        -   swagger-ui-express: servers basic UI for the documentation.
-   Database:
    -   MongoDB w/ mongodb
-   Security:
    -   JWT: basic auth mechanism
    -   Sentry: error logging
    -   Google Cloud logging: info logging

## Start

```TypeScript
npm run docker:start
npm start
```

## Stop

```TypeScript
npm run docker:stop
```

#### Dependecy Graph

![Dependecy Graph](graph.svg)
