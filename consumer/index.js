import Kafka from 'node-rdkafka';
import hidePositionTopic from '../hidePositionTopic.js';

let hiders = [];
let seeker = {
  x: 0,
  y: 0,
};

const consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();

consumer.on('ready', () => {
  console.log('👂 consumer ready..')
  consumer.subscribe(['hidePositionTopic']);
  consumer.consume();
}).on('data', (data) => {
  console.log(`🤫 New hider: ${hidePositionTopic.fromBuffer(data.value)}`);
  hiders.push(hidePositionTopic.fromBuffer(data.value));
});

let moveToHider = () => {
  if (!hiders.length) {
    console.log('🤨 There are no hiders right now.');
  }
  else {
    const sx = seeker['x'];
    const sy = seeker['y'];
    let hx = hiders[0]['x'];
    let hy = hiders[0]['y'];

    if (sx === hx && sy === hy) {
      console.log(`✅ Seeker has located hider at x: ${sx}, y: ${sy}`);
      hiders.shift();
      if (hiders.length) {
        console.log(`👀 Now locating hider at x: ${hiders[0]['x']}, y: ${hiders[0]['y']}`);
      }
    }
    else {
      if (sx !== hx) {
        seeker['x'] -= (sx-hx)/Math.abs(sx-hx);
      }
      else {
        seeker['y'] -= (sy-hy)/Math.abs(sy-hy);
      }
      console.log(`🏃 Moving seeker to x: ${seeker['x']}, y: ${seeker['y']} to locate hider at x: ${hx}, y: ${hy}`);
    }
  }
}

setInterval(() => {
  moveToHider();
}, 1000);
