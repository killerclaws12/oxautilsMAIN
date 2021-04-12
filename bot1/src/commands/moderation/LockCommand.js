const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('You do not have perms to use this cmd.')
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have perms to lock.')

    const role = message.guild.roles.cache.get('826970299395866655')
    let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!lockChannel) lockChannel = message.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err))
    message.channel.send('I have locked the channel :lock:')
  }
}