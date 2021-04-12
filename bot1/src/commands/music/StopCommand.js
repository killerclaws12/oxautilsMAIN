const BaseCommand = require('../../utils/structures/BaseCommand');
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = class StopCommand extends BaseCommand {
  constructor() {
    super('stop', 'music', []);
  }

  async run(client, message, args) {
    if(!message.member.voice.channel) return message.channel.send('Hey :wave: Please join a voice channel.')

    client.player.stop(message)
  }
}