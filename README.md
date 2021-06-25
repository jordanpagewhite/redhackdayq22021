# Red Hack Day Q2 2021

I have cloned [kriscfoster/node-kafka-producer-consumer](https://github.com/kriscfoster/node-kafka-producer-consumer) to accelerate my progress today, so that I can hopefully focus most of my time on learning and working with Apache Kafka.

# node-kafka-producer-consumer

Created by kriscfoster for [this YouTube tutorial](https://www.youtube.com/watch?v=EiDLKECLcZw).

A kafka producer/consumer proof of concept using node.

## Prerequisites

* `node`
* `docker`

## Running locally

* `npm install` - installs npm dependencies.
* `./scripts/start-kafka.sh` - starts kafka inside docker container.
* `./scripts/create-topic.sh` - creates kafka topic.
* `npm run start:producer` - starts producer.
* `npm run start:consumer` - starts consumer.
