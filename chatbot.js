const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost:1883');

const IN = 'chatbot/perguntas';
const OUT = 'chatbot/respostas';

client.on('connect', () => {
console.log('Chatbot connected');
client.subscribe(IN);
});

client.on('message', (topic, message) => {
const payload = JSON.parse(message.toString());
console.log('Question received:', payload.question);

let answer = "Desculpe, não sei responder isso ainda.";
const q = payload.question.toLowerCase();
if(q.includes('gol') || q.includes('marcar')) answer = 'Para marcar gol, concentre-se... (exemplo)';
if(q.includes('quando') && q.includes('jogo')) answer = 'O próximo jogo é neste fim de semana.';

const resp = { session: payload.session, answer, timestamp: new Date().toISOString() };
client.publish(OUT, JSON.stringify(resp));
});
