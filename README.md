# Web Push Service

![Travis CI](https://travis-ci.org/barend-erasmus/web-push-service.svg?branch=master) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

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
- Configure `Web Push Service` as a [systemd](https://www.freedesktop.org/wiki/Software/systemd) service by running `sudo curl -s https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/linux-systemd-install.sh | bash`.


**HTTPS**

Web Push Notifications can only be used on websites using [HTTPS](https://developers.google.com/web/fundamentals/push-notifications) and therefore we'll need to configure a reverse proxy with (SSL Certificates](https://letsencrypt.org).

**Setup HTTPS**

- Connect to your Linux Machine via SSH using your preferred client.
- Install [Let's Encrypt](https://letsencrypt.org) by running `sudo apt-get install -y letsencrypt`.
- Obtain SSL Certificates for your domain by running `sudo letsencrypt certonly --standalone --agree-tos --email your-email-address -d your-domain.com`.
- Install [NGINX](https://www.nginx.com) by running `sudo curl -s https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/linux-systemd-install.sh | your-domain.com`.

Browse `https://your-domain.com` to view the [Swagger UI](https://swagger.io)

![swagger](https://github.com/barend-erasmus/web-push-service/raw/master/images/swagger.png)

## Subscribing to Channels

See [Sample](https://github.com/barend-erasmus/web-push-service/tree/master/sample)

## Sending Web Push Notifications

**cURL**

`curl -d '{ "image": "https://via.placeholder.com/50x50", "message": "My first message", "title": "Hello World", "url": "https://example.com" }' -H "Authorization: <your-key-here>" -H "Content-Type: application/json" -X POST https://your-domain.com/api/push`

## Obtaining Credentials

Coming Soon

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
