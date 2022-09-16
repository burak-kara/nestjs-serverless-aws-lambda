# NestJS App Serverless
This is a starter project to deploy NestJS REST API to AWS Lambda using Serverless Framework.
It also supports Prisma for ORM and Swagger UI for API documentation.
It uses the following technologies:
- NodeJS 16
- NestJS
- AWS Lambda
- AWS API Gateway
- AWS RDS Postgres
- AWS S3
- AWS CloudWatch
- AWS CLoudFormation
- GitHub Actions (See this [workflow template](https://github.com/burak-kara/github-actions))
- Docker
- Swagger
- Slack (Notifications)

## Installation

```bash
$ yarn add
```

## Running the app

You need to create `.env` file in the root directory and add the necessary environment variables. 
Don't forget to add these environment variables to the Secrets in GitHub Repository Settings. 
See  [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository).
Also, you need add them to the `yml` files in [./github](./github) and `serverless.yml` file.

To use GitHub Actions, you need the followings:
- `CHANNEL_NAME` and set its value to your Slack channel name. (e.g., general, random)
- `PAT` and set its value to your GitHub Personal Access Token. Needs to have repo scope access. Refer [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- `SLACK_WEBHOOK` and set its value to your Slack webhook URL. Get one [here](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks).
- `SERVERLESS_ACCESS_KEY` and set its value to your Serverless Access Key ID. Refer [https://app.serverless.com/{your_org_name}}/settings/accessKeys](https://app.serverless.com/{your_org_name}}/settings/accessKeys)
- You can provide your Slack Message icon by modifying the `SLACK_ICON` in the [slack-notifier](.github/actions/slack-notifier/action.yml) file.

To use Prisma, you need the following:
- `DATABASE_URL` and set its value to your database URL. (e.g., postgres://user:password@host:port/database). Don't forget to add it to the Secrets in GitHub Repository Settings and also GitHub Actions.

```bash
# If you have Prisma as ORM 
# prisma generate
$ npx prisma generate

# prisma migrate
$ npx prisma migrate dev

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Local URL: http://localhost:3000/api

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Deploy

GitHub Actions will deploy the app to AWS CloudFormation stack. 
You can also deploy manually by running the followings:

### Prerequisites

- AWS account
    - Create an IAM user with programmatic access. See [AWS IAM User](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) 
- AWS CLI
    - Install. See [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
    - Configure credentials.
      See [AWS CLI docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
      and [AWS SAM docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-set-up-credentials.html)
- Serverless Framework.
  - Account. See [Serverless](https://www.serverless.com)
  - Serverless installation. See [Serverless docs](https://www.serverless.com/framework/docs)
    ```bash
    $ yarn global add serverless
    ```
- Docker
    - Install. See [Docker docs](https://docs.docker.com/get-docker/)
    - Start Docker daemon. See [Docker docs](https://docs.docker.com/engine/reference/commandline/dockerd/)

### Local Lambda

```bash
$ yarn global add serverless # if you don't have serverless installed
$ serverless offline start
```

### Deploy to AWS

This will deploy the lambda to AWS and create a new API Gateway endpoint.
The endpoint will be printed to the console.
You can also find it in the AWS console.

This step uses the AWS CLI and [Serverless Framework](https://www.serverless.com/).

```bash
$ yarn install
$ docker build .
$ serverless deploy --stage production
```

