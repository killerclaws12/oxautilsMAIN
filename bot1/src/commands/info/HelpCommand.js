const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'info', []);
  }

  async run(client, message, args) {

    const sectionEmbed = new Discord.MessageEmbed()
      .setTitle('Help Command!')
      .setDescription('Use >help section name to access another section.\nSections:\ninformation\nfun\nmoderation\nutilities')
      .addField('Fun Commands', 'Shows fun commands.')
      .addField('Information commands', 'Shows info commands.')
      .addField('Moderation commands', 'Shows moderation commands.')
      .addField('Utilities commands', 'Shows Utils commands.')
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    const infoEmbed = new Discord.MessageEmbed()
      .setTitle('Information Commands.')
      .addField('Help Commands', 'This commands shows the member all the commands.')
      .addField('Owner Command', 'Tells you the owner of the bot.');

    const funEmbed = new Discord.MessageEmbed()
      .setTitle('Fun Commands.')
      .addField('Snipe Command', 'Returns the last deleted message within a channel.');

    const moderationEmbed = new Discord.MessageEmbed()
      .setTitle('Moderation Commands.')
      .addField('Ban Command', 'Bans a member from the server')
      .addField('Warn Command', 'warns a member from the server or removes the warn')
      .addField('Kick Command', 'Kicks a member from the server')
      .addField('Lock Command', 'Locks a channel in the server')
      .addField('sm (slowmode) Command', 'Sets a slowmode time on the channel.')
      .addField('Mute Command', 'Mutes a member in the server')
      .addField('Purge Command', 'Purges messages within a channel')
      .addField('Tempban Command (COMING SOON)', 'Tempbans a member from the server')
      .addField('Tempmute Command', 'Tempmutes a member in a server')
      .addField('Unban Command', 'Unbans a member from the server')
      .addField('Unlock Command', 'Unlocks a channel in the server')
      .addField('Unmute Command', 'Unmutes a member in a server');

    const utilitiesEmbed = new Discord.MessageEmbed()
      .setTitle('Utilities Commands.')
      .addField('Verify Command', 'Gives the user the member role for the server.')
      .addField('Leaderboard Command', 'Shows who has the most xp in the server.')
      .addField('Level Command', 'Shows your level.');

    if (!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == 'information') return message.channel.send(infoEmbed);
    else if (args[0] == 'fun') return message.channel.send(funEmbed);
    else if (args[0] == 'utilities') return message.channel.send(utilitiesEmbed);
    else if (args[0] == 'moderation') return message.channel.send(moderationEmbed)
  }
}