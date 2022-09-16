FROM public.ecr.aws/lambda/nodejs:16

COPY . .
RUN npm install -g yarn
RUN yarn global add @nestjs/cli
RUN yarn global add serverless@3.2.0
RUN yarn install
RUN yarn build
# Uncomment the following line to generate Prisma Client
# RUN npx prisma generate

CMD ["dist/lambda.handler"]