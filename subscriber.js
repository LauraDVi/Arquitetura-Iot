const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost:1883');
const TOPIC = 'posts/notificacoes';

client.on('connect', () => {
console.log('Subscriber connected');
client.subscribe(TOPIC, () => console.log('Subscribed to', TOPIC));
});

client.on('message', (t, msg) => {
console.log('Notification:', msg.toString());
});
