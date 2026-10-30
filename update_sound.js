const fs = require('fs');
let content = fs.readFileSync('src/BluePrint/SoundVolume.tsx', 'utf8');
content = content.split('電子ルーレット停止ボタンを押す.mp3').join(`${process.env.PUBLIC_URL}/roulette_stop.mp3`);
content = content.split('決定ボタンを押す40.mp3').join(`${process.env.PUBLIC_URL}/decision40.mp3`);
fs.writeFileSync('src/BluePrint/SoundVolume.tsx', content, 'utf8');
console.log('updated SoundVolume.tsx');
