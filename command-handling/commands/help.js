const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    const commands = [
      { name: 'ping', description: 'Responds with pong!' },
      { name: 'kick', description: 'Kicks a member from the server' },
      { name: 'ban', description: 'Bans a member from the server' },
      { name: 'unban', description: 'Unbans a member from the server' },
      { name: 'mute', description: 'Mutes a member in the server' },
      { name: 'unmute', description: 'Unmutes a member in the server' },
      { name: 'purge', description: 'Deletes a specified number of messages' },
      { name: 'senddm', description: 'Sends a DM to a specified user' },
      { name: 'cat', description: 'Shows a random cat image' },
      { name: 'dog', description: 'Shows a random dog image' },
      { name: 'embed', description: 'Creates a custom embed message' },
      { name: 'help', description: 'Shows this help message' },
      { name: 'goat', description: 'Shows a random goat image' },
      { name: 'raccoon', description: 'Shows a random raccoon image' }
    ];

    // Create fields for each command
    const commandFields = commands.map(cmd => {
      return {
        name: `/${cmd.name}`,
        value: cmd.description,
        inline: true
      };
    });

    const embed = new EmbedBuilder()
      .setTitle('Bot Command List')
      .setDescription('Here are all the available commands:')
      .setColor('#5865F2')
      .setTimestamp()
      .setFooter({ 
        text: `Requested by ${interaction.user.tag}`, 
        iconURL: interaction.user.displayAvatarURL() 
      })
      .addFields(commandFields);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
};
