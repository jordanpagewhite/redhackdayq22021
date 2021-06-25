import Kafka from 'node-rdkafka';
import hidePositionTopic from '../hidePositionTopic.js';

let hiders = [];

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('consumer ready..')
  consumer.subscribe(['hidePositionTopic']);
  consumer.consume();
}).on('data', function(data) {
  console.log(`received message: ${hidePositionTopic.fromBuffer(data.value)}`);
  hiders.push(hidePositionTopic.fromBuffer(data.value));
  console.log(hiders);
});
