# DEMO

## About The Project

This is my code web blog. I'm using to internship in my company.

### Built With

- [Vue 3][Vue-url]
- [Vite][Vite-url]
- [Sass/Scss][Sass-url]
- [NestJS][Nest-url]
- [MySQL][Mysql-url]
- [TypeORM][TypeORM-url]

## Prerequires

- Nodejs version >= v16.20.1
- Mysql version >= ver 8.0.33

## Getting Started

### Installation

1. Clone the repo

```bash
git clone git@github.com:vfa-quangpm1/DEMO.git
```

2. Install NPM packages

- Client

```bash
$ cd ./client
$ npm install
```

- Server

```bash
$ cd ./server/apis
$ npm install
```

3. Config environment

- Setup Client
  > file .env in folder client

```
VITE_API_URL="http://localhost:3000/api/v1" #connect to server
```

- Setup folder server
  > file .env in folder ./server/apis

```
# Setup database connect
DB_HOST='localhost'
DB_PORT=3306
DB_USERNAME='root'
DB_PASSWORD='12345678'
DB_NAME='DEMO'

# SERCET KEY
SECRET_KEY='toiLaAiTrenDoi'

# Post server
PORT=3000

# CORS origin
CORS_ORIGIN=http://127.0.0.1:5173
CORS_ORIGIN_SECOND=http://localhost:5173
```

### Usage

- Run Client

```bash
$ cd ./client
$ npm run dev
```

- Run Server

```bash
$ cd ./server/apis
$ npm run start:dev
```

- Using post to create admin

  - APIs: http://localhost:{PORT}/api/v1/auth/register
  - Method POST
    ```
    {
      "username": "quang",
      "password": "123456",
      "role": "admin"
    }
    ```

- Using post to create categories
  - APIs: http://localhost:{PORT}/api/v1/category/create
  - Method POST
  ```
  {
    "category": "name category"
  }
  ```

## Information

### Client

- Feature
  - /home -> show post list
  - /post/:id -> show blog to read
  - Login | Logout | Register for user
  - /post/new -> write blog for admin
- Package using

```
"dependencies": {
  "@fortawesome/fontawesome-svg-core": "^6.4.0",
  "@fortawesome/free-brands-svg-icons": "^6.4.0",
  "@fortawesome/free-regular-svg-icons": "^6.4.0",
  "@fortawesome/free-solid-svg-icons": "^6.4.0",
  "@fortawesome/vue-fontawesome": "^3.0.3",
  "@types/highlight.js": "^10.1.0",
  "@types/marked": "^5.0.1",
  "axios": "^1.4.0",
  "dayjs": "^1.11.9",
  "highlight.js": "^11.8.0",
  "jwt-decode": "^3.1.2",
  "marked": "^5.1.1",
  "marked-highlight": "^2.0.1",
  "pinia": "^2.1.3",
  "vue": "^3.3.4",
  "vue-cookies": "^1.8.3",
  "vue-router": "^4.2.2",
  "vuex": "^4.0.2"
},
"devDependencies": {
  "@rushstack/eslint-patch": "^1.2.0",
  "@tsconfig/node18": "^2.0.1",
  "@types/jsdom": "^21.1.1",
  "@types/node": "^18.16.17",
  "@vitejs/plugin-vue": "^4.2.3",
  "@vue/eslint-config-typescript": "^11.0.3",
  "@vue/test-utils": "^2.3.2",
  "@vue/tsconfig": "^0.4.0",
  "cypress": "^12.14.0",
  "eslint": "^8.39.0",
  "eslint-plugin-cypress": "^2.13.3",
  "eslint-plugin-vue": "^9.11.0",
  "jsdom": "^22.1.0",
  "npm-run-all": "^4.1.5",
  "sass": "^1.63.6",
  "sass-loader": "^13.3.2",
  "start-server-and-test": "^2.0.0",
  "typescript": "~5.0.4",
  "vite": "^4.3.9",
  "vitest": "^0.32.0",
  "vue-tsc": "^1.6.5"
}
```

### Server

- Feature
  - Login | Logout | Register
  - Authentication use access token and refresh token
  - APIs for post, auth, category
- Package using

```
"dependencies": {
  "@nestjs/common": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "@nestjs/core": "^10.0.0",
  "@nestjs/jwt": "^10.1.0",
  "@nestjs/mapped-types": "*",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/swagger": "^7.1.1",
  "@nestjs/typeorm": "^10.0.0",
  "bcrypt": "^5.1.0",
  "dotenv": "^16.3.1",
  "mysql2": "^3.5.0",
  "passport": "^0.6.0",
  "passport-jwt": "^4.0.1",
  "passport-local": "^1.0.0",
  "reflect-metadata": "^0.1.13",
  "rxjs": "^7.8.1",
  "typeorm": "^0.3.17"
},
"devDependencies": {
  "@nestjs/cli": "^10.0.0",
  "@nestjs/schematics": "^10.0.0",
  "@nestjs/testing": "^10.0.0",
  "@types/bcrypt": "^5.0.0",
  "@types/express": "^4.17.17",
  "@types/jest": "^29.5.2",
  "@types/node": "^20.3.1",
  "@types/passport-jwt": "^3.0.9",
  "@types/passport-local": "^1.0.35",
  "@types/supertest": "^2.0.12",
  "@typescript-eslint/eslint-plugin": "^5.59.11",
  "@typescript-eslint/parser": "^5.59.11",
  "eslint": "^8.42.0",
  "eslint-config-prettier": "^8.8.0",
  "eslint-plugin-prettier": "^4.2.1",
  "jest": "^29.5.0",
  "prettier": "^2.8.8",
  "source-map-support": "^0.5.21",
  "supertest": "^6.3.3",
  "ts-jest": "^29.1.0",
  "ts-loader": "^9.4.3",
  "ts-node": "^10.9.1",
  "tsconfig-paths": "^4.2.0",
  "typescript": "^5.1.3"
}
```

### Technology

- Login|logout|register use Refresh token
- Vue with Vuex, Vue-router, Axios, markedjs, dayjs...
- Sass/Scss to CSS pre-processor
- NestJS with passport, CORS, TypeORM, jwt, bcrypt, ...

## Link Demo

Link: https://drive.google.com/file/d/1L1HRv96WKj8YHb7wn0uPZI4H89rvfaXh/view?usp=drive_link

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Vue-url]: https://vuejs.org/
[Vite-url]: https://vitejs.dev/guide/
[Nest-url]: https://nestjs.com/
[Sass-url]: https://sass-lang.com/documentation/style-rules/declarations/
[Mysql-url]: https://www.mysql.com/
[TypeORM-url]: https://typeorm.io/
