FROM node:10-alpine

# RUN apk add --no-cache make gcc g++ python

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

# RUN chmod +x ./node_modules/@prodigy/config/entrypoint
EXPOSE 3001
# RUN yarn dev:server
# will result in config npm run start role will determine the ps, ENV, and AWS_REGION
# ENTRYPOINT ["./node_modules/.bin/config"]
CMD [ "yarn", "dev:server" ]
