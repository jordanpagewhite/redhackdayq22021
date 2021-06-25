import Kafka from 'node-rdkafka';
import hidePositionTopic from '../hidePositionTopic.js';

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'hidePositionTopic'
});

stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

function queuePosition() {
  const event = getRandomPosition();
  const success = stream.write(hidePositionTopic.toBuffer(event));
  if (success) {
    console.log(`message queued (${JSON.stringify(event)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
}

function getRandomPosition() {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  return {
    'x': x,
    'y': y,
  };
}

setInterval(() => {
  queuePosition();
}, 10000);
