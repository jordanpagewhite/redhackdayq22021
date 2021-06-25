import Kafka from 'node-rdkafka';
import hidePositionTopic from '../hidePositionTopic.js';

const interval = 10000;

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'hidePositionTopic'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

let queuePosition = () => {
  const event = getRandomPosition();
  const success = stream.write(hidePositionTopic.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

let getRandomPosition = () => {
  const bounds = 10;
  const x = Math.floor(Math.random() * bounds);
  const y = Math.floor(Math.random() * bounds);
  return {
    'x': x,
    'y': y,
  };
}

setInterval(() => {
  queuePosition();
}, interval);
