# Telraam-ui

![Code analysis](https://github.com/NuttyShrimp/telraam-ui/actions/workflows/codeql-analysis.yml/badge.svg)

CRUD-dashboard for [Telraam](https://github.com/12urenloop/Telraam)

## Setup

### Prerequisites

- [Telraam](https://github.com/12urenloop/Telraam)
- [NodeJS (v12.x.x-v14.x.x, v16.x.x)](https://nodejs.dev/download)
- [Yarn (optional)](https://yarnpkg.com/)

### Installing

Clone on your machine:

```shell
git clone https://github.com/NuttyShrimp/telraam-ui.git
cd telraam-ui
```

Install the npm package:

With npm: `npm install`
or with yarn: `yarn install`

### Enviroment

To make the UI work, you should copy `.env.template` to `.env`.
Otherwise, the UI will not be able to make requests to telraam

To change the telraam endpoint, update the variable in the .env file

## Deploy

To deploy this website you can use the built-in vite preview tool:
`npm run serve` or `yarn server`

## Development

To run a webserver with a filewatcher run:
`npm run dev` or `yarn dev`
