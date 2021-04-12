const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have perms to use this command.')
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have perms. :(')

    //Variables
    let reason = args.slice(1).join(" ")
    let userID = args[0]

    //Input Checking
    if (!reason) reason = 'No reason given'
    if (!args[0]) return message.channel.send('You must mention someones id to unban.')
    if (isNaN(args[0])) return message.channel.send('The ID you said is not a number.')

    //Executing
    message.guild.fetchBans().then(async bans => {
      if(bans.size == 0) return message.channel.send('This server has no one banned.')
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return message.channel.send('The user id is not banned from this server')
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err)
        return message.channel.send('Something went wrong. Dm the bot developer because this may be a error.')
      }).then(() => {
        message.channel.send(`Successfully unbanned ${args[0]}`)
      })
    })
  }
}