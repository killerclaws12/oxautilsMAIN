const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have perms to use this command.')
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('I do not have perms to mute people.')
    let reason = args.slice(1).join(" ")

    const muteRole = message.guild.roles.cache.get('828712628498333707')
    const memberRole = message.guild.roles.cache.get('826970299395866655')
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been unmuted in ${message.guild.name}`)
      .setColor("RED")
      .setTimestamp()


    if(!args[0]) return message.channel.send('No member stated.')
    if(!mentionedMember) return message.channel.send('The member stated is not in the server.')
    if(mentionedMember.user.id == message.author.id) return message.channel.send('You cannot mute yourself.')
    if(mentionedMember.user.id == client.user.id) return message.channel.send('You cannot mute me!')
    if(!reason) reason = 'No reason given'
    if(mentionedMember.roles.cache.has(memberRole.id)) return message.channel.send('This member is already unmuted.')
    if(message.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return message.channel.send('You cannot unmute someone that has the same role as you or someone that is higher than you.')

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err))
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then( message.channel.send('Error please dm the developer now.')))
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('Error please dm the developer now.')))

    message.channel.send(`Member has been unmuted`)
  }
}