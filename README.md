# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program.

## Deployment

**S3 URL:**
[https://deploywebappstack-deploymentfrontendbucket67ceb713-i0fyfwfombc8.s3.us-east-1.amazonaws.com/](https://deploywebappstack-deploymentfrontendbucket67ceb713-i0fyfwfombc8.s3.us-east-1.amazonaws.com/)

**Cloudfront:**
[https://d67pyit89tiwq.cloudfront.net/](https://d67pyit89tiwq.cloudfront.net/)

**Api Gateway:**
[https://4xxckkyhoj.execute-api.us-east-1.amazonaws.com/prod/](https://4xxckkyhoj.execute-api.us-east-1.amazonaws.com/prod/)

## Tech stack

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Serverless](https://serverless.com/) as a serverless framework
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.

### `cdk:build`

Builds frontend assets and prepares files used by the CDK stack.

### `cdk:deploy`

Deploys the CDK infrastructure from the `infra` folder.

### `cdk:invalidate`

Syncs build files to the S3 bucket and invalidates CloudFront distribution cache.

### `cdk:build:deploy`

Builds assets and then deploys the CDK stack.

### `cdk:build:invalidate`

Builds assets, syncs them to the deployment S3 bucket, and invalidates the CloudFront distribution cache.

### `cdk:synth`

Synthesizes the CDK CloudFormation template.

### `cdk:destroy`

Destroys all resources created by the CDK stack.
