const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports = class LevelCommand extends BaseCommand {
  constructor() {
    super('level', 'utils', []);
  }

  async run(client, message, args) {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!mentionedMember) mentionedMember = message.member;

    const target = await Levels.fetch(mentionedMember.user.id, message.guild.id)
    if (!target) return message.channel.send('The member mentioned did not have any xp')

    try {
      message.channel.send(`${mentionedMember.user.tag} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level + 1)}`)
    } catch (err) {
      console.log(err)
    }
  }
}