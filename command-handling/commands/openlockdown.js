const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: "You don't have permission to unlock channels.",
        ephemeral: true
      });
    }
    
    const channelToUnlock = interaction.options.getChannel('channel') || interaction.channel;
    
    try {
      const everyoneRole = interaction.guild.roles.everyone;
      const currentPerms = channelToUnlock.permissionOverwrites.cache.get(everyoneRole.id);

      if (!currentPerms || !currentPerms.deny.has(PermissionFlagsBits.SendMessages)) {
        return interaction.reply({
          content: `⚠️ Channel ${channelToUnlock} is not locked down.`,
          ephemeral: true
        });
      }
      
      await channelToUnlock.permissionOverwrites.edit(everyoneRole, {
        SendMessages: null
      });
      
      await interaction.reply({
        content: `🔓 Channel ${channelToUnlock} has been unlocked successfully.`,
        ephemeral: true
      });

      await channelToUnlock.send({
        embeds: [{
          color: 0x00ff00, 
          title: '🔓 Channel Unlocked',
          description: '**This channel has been unlocked by Staff.**',
          timestamp: new Date(),
          footer: {
            text: `Unlocked by ${interaction.user.tag}`
          }
        }]
      });
      
    } catch (error) {
      await interaction.reply({
        content: `Failed to unlock the channel: ${error.message}`,
        ephemeral: true
      });
    }
  }
};