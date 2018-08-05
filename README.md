# Web Push Service

![Travis CI](https://travis-ci.org/barend-erasmus/web-push-service.svg?branch=master) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

Host your own Web Push Service.

## Table of contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Authors](#authors)
- [License](#license)

## Deployment

### Development/Testing Enviromnent

For development or testing purposes, the web push service can be deployed using port `8080` and a file-based embedded database.

**Prerequisites**

- Linux Machine with Ubuntu

**Setup**

- Connect to your Linux Machine via SSH using your preferred client.
- Install [node.js](https://nodejs.org) by using the [guide](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) on their website.
- Install `Web Push Service` via [npm](https://www.npmjs.com) by running `npm install -g web-push-service`
- Configure `Web Push Service` as a [systemd](https://www.freedesktop.org/wiki/Software/systemd) service by running `curl -s https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/linux-systemd-install.sh | bash`

Browse to `http://<ip-address>:8080`

## Getting Started

### Production

This single-line command will setup a instance of Web Push Service on port `8080` and will use `NeDB` as its database.

`sudo curl -s https://raw.githubusercontent.com/barend-erasmus/web-push-service/master/scripts/linux-systemd-install.sh | bash`

**MongoDB**

The database can be changed from `NeDB` to `MongoDB` by changing the SystemD Service File.

`sudo nano /lib/systemd/system/web-push-service.service`

```
[Unit]
Description=Web Push Service

[Service]
Type=simple
ExecStart=/usr/bin/web-push-service start --mongo mongodb://localhost:27017 --port 8080

[Install]
WantedBy=multi-user.target
```

### Development

* Install [Node.js](https://nodejs.org/en/download)
* Clone this repository - `git clone https://github.com/barend-erasmus/web-push-service.git`
* Install packages - `npm install`
* Run - `npm start`

## Installation

`npm install -g web-push-service`

## Usage

```
Usage: start [options]

  Options:

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

## Authors

* **Barend Erasmus** - *Initial work* - [barend-erasmus](https://github.com/barend-erasmus)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
