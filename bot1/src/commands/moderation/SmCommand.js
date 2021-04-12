const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name : 'sm',
  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    if(!args[0]) return message.reply('You need to speify a time.')
    if(isNaN(args[0])) return message.reply('You need to speicy a valid number to set slowmode to.');
    var time = args[0]
    if(args[0] < 0) return message.reply('You need to speicfy a number greater than 0 to set slowmode to.')
    if(args[0] > 21600) return message.reply('You need to specify a time that is less than 6 hours!')
    message.channel.setRateLimitPerUser(time)

    var verify = message.guild.emojis.cache.find(emoji => emoji.name === 'wow')

    var embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${verify} I have successfully set slowmode to ${time} seconds.`);
    message.channel.send(embed)
}
}
