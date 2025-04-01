const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    const commands = [
      { name: 'ping', description: 'Responds with pong!' },
      { name: 'kick', description: 'Kicks a member from the server' },
      { name: 'ban', description: 'Bans a member from the server' },
      { name: 'unban', description: 'Unbans a member from the server' },
      { name: 'mute', description: 'Times out a user for a specified duration' },
      { name: 'unmute', description: 'Removes a timeout from a user' },
      { name: 'purge', description: 'Deletes a specified number of messages' },
      { name: 'senddm', description: 'Sends a DM to a specified user' },
      { name: 'cat', description: 'Shows a random cat image' },
      { name: 'dog', description: 'Shows a random dog image' },
      { name: 'raccoon', description: 'Shows a random raccoon image' },
      { name: 'goat', description: 'Shows a random goat image' },
      { name: 'animal', description: 'Shows a random image of the specified animal' },
      { name: 'embed', description: 'Creates a custom embed message' },
      { name: 'lockdown', description: 'Locks down a text channel to prevent messages' },
      { name: 'openlockdown', description: 'Removes a lockdown from a channel' },
      { name: 'ai', description: 'Talk to an AI assistant' },
      { name: 'image', description: 'Generate an image with AI based on your prompt' },
      { name: 'help', description: 'Shows this help message' }
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
      ephemeral: false
    });
  }
};
