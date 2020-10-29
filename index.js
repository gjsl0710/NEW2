const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzcwOTcxNDkxMTIxNzU4MjA4.X5lVJw.E2bsZXC5NrK8AJIDb8AxNlARi-I';

const { readdirSync } = require('fs');
const { join } = require('path');
client.on('messageDelete', async message => {
  message.channel.send(`<@!${message.author.id}> 님이 \`${message.content}\`를 삭제했대요~!!`)
})

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) return // 임베드로 인한 수정같은 경우 
  oldMessage.channel.send(`<@!${oldMessage.author.id}> 님이 \`${oldMessage.content}\` 를 \`${newMessage.content}\` 로 수정했어요~!`)
})
client.commands = new Discord.Collection();

const prefix = '문아' //자신의 프리픽스


const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("error", console.error);

client.on('ready', () => {
  console.log(`${client.user.id}로 로그인 성공!`);
  client.user.setActivity('"문아 도움말" 을입력하면 도움말이 표시된다구요?!') //상태메시지
});

client.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

client.login(token);