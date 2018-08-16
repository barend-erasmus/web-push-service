# Web Push Service

![Travis CI](https://travis-ci.org/barend-erasmus/web-push-service.svg?branch=master) ![Coveralls](https://coveralls.io/repos/github/barend-erasmus/web-push-service/badge.svg?branch=master) ![NPM Package](https://badge.fury.io/js/web-push-service.svg) ![Dependencies](https://david-dm.org/barend-erasmus/web-push-service.svg) ![Maintainability](https://api.codeclimate.com/v1/badges/ef14b95993167de0e04c/maintainability) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Last Commit](https://img.shields.io/github/last-commit/barend-erasmus/web-push-service.svg) ![Language](https://img.shields.io/github/languages/top/barend-erasmus/web-push-service.svg)

Host your own Web Push Service.

## Table of contents

- [Deployment](#deployment)
- [Subscribing to Channels](#subscribing-to-channels)
- [Sending Web Push Notifications](#sending-web-push-notifications)
- [Installation as CLI](#installation-as-cli)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contribute](#contribute)
- [Authors](#authors)
- [License](#license)

## Deployment

### Production Environment

**Prerequisites**

- Linux Machine with Ubuntu. Get $10 to spend at [Digital Ocean](https://m.do.co/c/c72a0c1661d7).
- Domain Name. [Namecheap](https://www.namecheap.com).

**Setup**

- Connect to your Linux Machine via SSH using your preferred client.
- Install [node.js](https://nodejs.org) by using the [guide](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) on their website.
- Install `Web Push Service` via [npm](https://www.npmjs.com) by running `sudo npm install -g web-push-service`.
- Configure `Web Push Service` by runnning `web-push-service --host your-domain.com --mongo mongodb://127.0.0.1:27017 --port 8080`

Browse `https://your-domain.com` to view the [Swagger UI](https://swagger.io)

![swagger](https://github.com/barend-erasmus/web-push-service/raw/master/images/swagger.png)

## Subscribing to Channels

See [Sample](https://github.com/barend-erasmus/web-push-service/tree/master/sample)

## Sending Web Push Notifications

**cURL**

`curl -d '{ "image": "https://via.placeholder.com/50x50", "message": "My first message", "title": "Hello World", "url": "https://example.com" }' -H "Authorization: <your-key-here>" -H "Content-Type: application/json" -X POST https://your-domain.com/api/v1/push`

## Obtaining Credentials

**cURL**

`curl -d '{ "endpoint": "https://your-domain.com" }' -H "Content-Type: application/json" -X POST https://your-domain.com/api/v1/client`

This request will return your `key` and `publicKey`.

```json
{
  "key": "467b5026-c14a-48fc-97b1-f3ca5fb21a95",
  "publicKey": "BBqOI20HlYxLMth7sbTk002PMinG7QVRUC12BEZpvq9r1maySNv30MeHxHSYPzKULqhHiSIsFKsdVlc9IJ1NuwE="
}
```

## Installation as CLI

`npm install -g web-push-service`

## Usage

```
Usage: start [options]

  Options:

    -h --host <host>    Host
    -m --mongo <host>   Mongo
    -p --port <port>    Port
    -h, --help          output usage information

Usage: install [options]

  Options:

    -h --host <host>   Host
    -m --mongo <host>  Mongo
    -p --port <port>   Port
    --nginx            Install NGINX
    --letsencrypt      Install Let's Encrypt
    -h, --help         output usage information
```

## Dependencies

* [ajv](https://www.npmjs.com/package/ajv) - Another JSON Schema Validator
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
* [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right
* [commander](https://www.npmjs.com/package/commander) - The complete solution for node.js command-line programs
* [cors](https://www.npmjs.com/package/cors) - Node.js CORS middleware
* [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework
* [js-yaml](https://www.npmjs.com/package/js-yaml) - YAML 1.2 parser / writer for JavaScript
* [mongodb](https://www.npmjs.com/package/mongodb) - The official MongoDB driver for Node.js
* [nedb](https://www.npmjs.com/package/nedb) - File-based embedded data store for node.js
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - Swagger UI Express
* [uuid](https://www.npmjs.com/package/uuid) - RFC4122 (v1, v4, and v5) UUIDs
* [web-push](https://www.npmjs.com/package/web-push) - Web Push library for Node.js

## Contribute

Coming Soon

## Authors

* **Barend Erasmus** - *Initial work* - [barend-erasmus](https://github.com/barend-erasmus)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
