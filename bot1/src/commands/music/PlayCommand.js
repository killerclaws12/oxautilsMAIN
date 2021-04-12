const BaseCommand = require('../../utils/structures/BaseCommand');
const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', []);
  }

  async run(client, message, args) {
    if(!message.member.voice.channel) return message.channel.send('Hey :wave: Please join a voice channel. ')

        const query = args.join(" ")
        if(!query) return message.reply('Please enter a song name bud!')

        await client.player.play(message, query)
  }
}