const mqtt = require('mqtt');
const { v4: uuidv4 } = require('uuid');

const client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost:1883');
const TOPIC = 'posts/publicar';

client.on('connect', () => console.log('Publisher connected'));

function publishPost(user, text){
const msg = { id: uuidv4(), user, text, timestamp: new Date().toISOString() };
client.publish(TOPIC, JSON.stringify(msg));
console.log('Published', msg.id);
}

if(require.main === module){
const [,,user, ...rest] = process.argv;
const text = rest.join(' ') || 'Mensagem de teste';
publishPost(user || 'user1', text);
}
