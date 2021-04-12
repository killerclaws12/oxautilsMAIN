const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class VerifyCommand extends BaseCommand {
  constructor() {
    super('verify', 'utils', []);
  }

  async run(client, message, args) {
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to give roles.')

    const role = message.guild.roles.cache.get('826970299395866655')

    await message.member.roles.add(role.id).catch(err => console.log(err))

    message.delete()
  }
}