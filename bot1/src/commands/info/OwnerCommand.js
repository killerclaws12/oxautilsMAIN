const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class OwnerCommand extends BaseCommand {
  constructor() {
    super('owner', 'info', []);
  }

  async run(client, message, args) {
    const ownerEmbed = new Discord.MessageEmbed()
    .setTitle(`Owner of this bot`)
    .setDescription(`Mr.Claws#1111`)
    .setColor("BLUE")
    .setFooter('This bot was developed with node.js')
    .setTimestamp()

  message.channel.send(ownerEmbed)
  }
}