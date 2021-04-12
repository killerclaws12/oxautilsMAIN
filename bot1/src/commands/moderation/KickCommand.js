
const Discord = require('discord.js')

module.exports = {
    name : 'kick',
  async run(client, message, args) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You cannot use this command.')
    const mentionedMember = message.mentions.members.first()
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given"
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`You were kicked from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("RED")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    if(!args[0]) return message.channel.send('Please do this command again but mention a member!')
    if(!mentionedMember) return message.channel.send("The member that you may have mentioned is not in the server.")
    try {
      await mentionedMember.send(kickEmbed)
    } catch(err) {
      console.log('I wan unable to message the member stated.')
    }
    try {
      mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      message.channel.send("I was unable to kick the user from the server. (contact dev because this may be a error)")
    }
    message.channel.send(`${mentionedMember} has been kicked!`)
  }
}