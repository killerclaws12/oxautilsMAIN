const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const Levels = require('discord-xp')

module.exports = class LeaderboardCommand extends BaseCommand {
  constructor() {
    super('leaderboard', 'utils', []);
  }

  async run(client, message, args) {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // We grab top 5 users with most xp in the current server.

    if (rawLeaderboard.length < 1) return reply("Nobody's in the server leaderboard yet.");

    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

    const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

    message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
  }
}