const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('tempmute', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have perms to use this command.')
    if(!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('I do not have perms to mute.')
    
    const muteRole = message.guild.roles.cache.get('828712628498333707')
    const memberRole = message.guild.roles.cache.get('826970299395866655')
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let time = args[1]
    let reason = args.slice(2).join(" ")
    const tempmuteEmbed = new Discord.MessageEmbed()
    .setTitle(`You have been muted in ${message.guild.name}`)
    .addField(`Time: ${time}`, `Reason: ${reason}`)
    .setTimestamp()
  
    if(!args[0]) return message.channel.send('You must mention a member to tempmute.')
    if(!mentionedMember) return message.channel.send('The member mentioned is not in the server.')
    if(!mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot mute people in the same role or higher.')
    if(!time) return message.channel.send('You must mention a time.')
    if(!reason) reason = 'No reason given'

    message.delete()

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err))
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err))

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err))
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err))
    await mentionedMember.send(`You have been unmuted in ${message.guild.name}`).catch(err => console.log(err))
    }, ms(time))
  
  
  }
}