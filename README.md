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

### Database

If your telraam is not running on your local machine or you changed the port you should change `TELRAAM_ENDPOINT` in `src/constant.ts`

eg:

```typescript
export const TELRAAM_ENDPOINT = 'http://my-super-secret-ip:1235';
```

## Deploy
To deploy this website you can use the built-in vite preview tool:
`npm run serve` or `yarn server`

## Development
To run a webserver with a filewatcher run:
`npm run dev` or `yarn dev`