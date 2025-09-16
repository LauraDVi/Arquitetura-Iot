const mqtt = require('mqtt');
const axios = require('axios');

const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost:1883';
const ORION = process.env.ORION_URL || 'http://localhost:1026';

const client = mqtt.connect(MQTT_URL);

client.on('connect', () => {
console.log('IoT Agent Mock connected to MQTT');
client.subscribe('posts/publicar');
client.subscribe('chatbot/perguntas');
});

client.on('message', async (topic, message) => {
try{
const payload = JSON.parse(message.toString());
if(topic === 'posts/publicar'){
// monta entidade NGSI simples
const entity = {
id: `post:${payload.id}`,
type: 'Post',
content: { value: payload.text },
author: { value: payload.user },
timestamp: { value: payload.timestamp }
};
await axios.post(`${ORION}/v2/entities`, entity);
console.log('Posted entity to Orion-mock for post', payload.id);
}

if(topic === 'chatbot/perguntas'){
const entity = {
id: `chat:${payload.session}`,
type: 'ChatQuestion',
question: { value: payload.question },
user: { value: payload.user },
timestamp: { value: payload.timestamp }
};
await axios.post(`${ORION}/v2/entities`, entity);
console.log('Posted chatbot question to Orion-mock', payload.session);
}
}catch(e){
console.error('Error processing message', e.message);
}
});
