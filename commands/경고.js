const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "경고",
    description: "Warn a member",

    async run (client, message, args) {

        const permission = new Discord.MessageEmbed()
        .setTitle(':x: Missing arguments')
        .setColor(0xFF0000)
        .setDescription('(ERR!) 관리자만 사용가능하다구요?!')
        .setTimestamp()

        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(permission);

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        const noArgs = new Discord.MessageEmbed()
        .setTitle(':x: Missing arguments')
        .setColor(0xFF0000)
        .setDescription('(ERR!) 명령어 뒤에 해당 커맨드를 실행할 유저를 맨션 해달라구요?!')
        .setTimestamp()

        if(!user) return message.channel.send(noArgs);

        if(user.bot) return message.channel.send('봇한텐 경고를 줄 수 없어용~!');

        if(message.author.id === user.id) return message.channel.send('자기 자신에게 경고하시게요?!');

        if(message.guild.owner.id === user.id) return message.channel.send('서버총괄에게 경고를 줄 순 없어요..!');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3) return message.channel.send(`${user}님 은/는 이미 3번의 경고를 받았어요!`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`${message.guild.name}님이 당신에게 경고를 내렸다랄까요? \`${reason}\``)
            await message.channel.send(`**${user.username}**님이 경고를 받았어요!`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`${message.guild.name}님이 당신에게 경고를 내렸다랄까요? \`${reason}\``)
            await message.channel.send(`**${user.username}**님이 경고를 받았어요!`)
        }
    }
}