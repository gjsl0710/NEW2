const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "날씨",
    description: "Checks a weather forecast",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        // 'C' can be changed to 'F' for farneheit results
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('날씨를 검색할 지역을 입력해 주세요')

        if(result === undefined || result.length === 0) return message.channel.send('**알수없는 지역** 입니다! 다시찾아주세용!');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`${current.observationpoint}지역의 날씨라구요?!`)
        .setThumbnail(current.imageUrl)
        .setColor('RANDOM')
        .addField('시간 종류', `GMT-${location.timezone}`, true)
        .addField('온도 타입', '섭씨', true)
        .addField('온도', `${current.temperature}°`, true)
        .addField('풍향', current.winddisplay, true)
        .addField('체감 온도', `${current.feelslike}°`, true)
        .addField('습도', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}