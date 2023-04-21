FROM node:19-alpine3.15

ENV NODE_OPTIONS=--max_old_space_size=4096

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir /api

# files needed for production
COPY dist/ /api/dist
COPY static/ /api/static 
ADD node_modules/ /api/node_modules 
COPY package.json /api
COPY .env /api

WORKDIR /api

RUN npm rebuild

# ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["npm", "run", "start:prod"]