const Discord = require('discord.js');

module.exports = {
    name: "프사",
    description: "프로필 사진을 가져옵니다",

    async run (client, message, args) {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}님의 프사랄까요?`)
        .setImage(avatar)
        .setColor("RANDOM")

        message.channel.send(embed);
    }
}