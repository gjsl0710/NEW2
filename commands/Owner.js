const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: "경고",
    description: "Warn a member",

    async run (client, message, args) {

        const permission = new Discord.MessageEmbed()
        .setTitle(':x: 오류가 발생했어요!')
        .setColor(0xFF0000)
        .setDescription('관리자만 사용 가능하다구요?!')
        .setTimestamp()

        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(permission);

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        const noArgs = new Discord.MessageEmbed()
        .setTitle(':x: 오류가 발생했어요!')
        .setColor(0xFF0000)
        .setDescription('누구를 경고하실건지 알려주세요!')
        .setTimestamp()

        if(!user) return message.channel.send(noArgs);

        if(user.bot) return message.channel.send('봇은 경고를 줄 수 없다구요?!');

        if(message.author.id === user.id) return message.channel.send('자기 자신에게 경고를..?');

        if(message.guild.owner.id === user.id) return message.channel.send('서버 소유권 또는 관리자 권한을 가진분에겐 경고를 드릴 수 없어요..!');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 3) return message.channel.send(`${user}님은 이미 3번의 경고를 받았어요..!`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`${message.guild.name}서버 관리자가 당신에게 경고를 내렸어요... 이유: \`${reason}\``)
            await message.channel.send(`**${user.username}**님이 경고를 받았어요!`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`${message.guild.name}서버 관리자가 당신에게 경고를 내렸어요... 이유: \`${reason}\``)
            await message.channel.send(`**${user.username}**님이 경고를 받았어요!`)
        }
    }
}