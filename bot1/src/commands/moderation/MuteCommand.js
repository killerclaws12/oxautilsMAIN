const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have perms to use this command.')
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('I do not have perms to mute people.')
    let reason = args.slice(1).join(" ")

    const muteRole = message.guild.roles.cache.get('828712628498333707')
    const memberRole = message.guild.roles.cache.get('826970299395866655')
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("RED")
      .setTimestamp()


    if(!args[0]) return message.channel.send('No member stated.')
    if(!mentionedMember) return message.channel.send('The member stated is not in the server.')
    if(mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself.')
    if(mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me!')
    if(!reason) reason = 'No reason given'
    if(mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send('This member is already muted.')
    if(message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('You cannot mute someone that has the same role as you or someone that is higher than you.')

    await mentionedMember.send(muteEmbed).catch(err => console.log(err))
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then( message.channel.send('Error please dm the developer now.')))
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err).then(message.channel.send('Error please dm the developer now.')))
    message.channel.send(`Member has been muted`)
  }
}