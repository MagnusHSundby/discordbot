const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        content: "You don't have permission to lock down channels.",
        ephemeral: true
      });
    }
    
    const channelToLock = interaction.options.getChannel('channel') || interaction.channel;
    
    try {
      const everyoneRole = interaction.guild.roles.everyone;
      
      const currentPerms = channelToLock.permissionOverwrites.cache.get(everyoneRole.id);
      if (currentPerms && currentPerms.deny.has(PermissionFlagsBits.SendMessages)) {
        return interaction.reply({
          content: `⚠️ Channel ${channelToLock} is already locked down.`,
          ephemeral: true
        });
      }
      
      await channelToLock.permissionOverwrites.edit(everyoneRole, {
        SendMessages: false
      });
      await interaction.reply({
        content: `🔒 Channel ${channelToLock} has been locked down successfully.`,
        ephemeral: true
      });

      await channelToLock.send({
        embeds: [{
          color: 0xff0000, 
          title: '🔒 Channel Locked',
          description: '**This channel has been locked by Staff.**',
          timestamp: new Date(),
          footer: {
            text: `Locked by ${interaction.user.tag}`
          }
        }]
      });
      
    } catch (error) {
      await interaction.reply({
        content: `Failed to lock down the channel: ${error.message}`,
        ephemeral: true
      });
    }
  }
};

