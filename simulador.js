const { fork } = require('child_process');
const path = require('path');

const n = parseInt(process.argv[2] || '10');
for(let i=0;i<n;i++){
const user = `user${i+1}`;
const child = fork(path.join(__dirname,'publisher.js'), [user, `Mensagem simulada do ${user}`]);
}
