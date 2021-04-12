const BaseEvent = require('../../utils/structures/BaseEvent');
const Afk = require('../../database/models/afkSchema')
const Levels = require('discord-xp')
const Discord = require('discord.js')

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {
    if (message.author.bot) return;
    
    const randomXP = Math.floor(Math.random() * 29) + 1; //Gives 1-30 XP
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXP)
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id)
      message.channel.send(`${message.member}, you are now level ${user.level}, Keep chatting to level up more!`)
    }

    if (await Afk.findOne({ userID: message.author.id })) {
      let afkProfile = await Afk.findOne({ userId: message.author.id })
      if (afkProfile.messagesLeft == 0) {
        await Afk.findOneAndDelete({ userID: message.author.id })
        message.channel.send('Your not afk anymore!')
      } else {
        await Afk.findOneAndUpdate({ userID: message.author.id }, { messagesLeft: afkProfile.messagesLeft - 1 })
      }
    }

    if (message.mentions.members.first()) {
      await message.mentions.members.forEach(async member => {
        let afkProfile = await Afk.findOne({ userID: member.user.id })
        if (afkProfile) message.channel.send(`${member.user.tag}, is in afk mode for ${afkProfile.reason}`)
      })
    }

    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}