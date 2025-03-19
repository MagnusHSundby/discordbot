const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    // Get command parameters
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const guildName = interaction.guild.name;
    
    // Check moderator permissions
    if (!interaction.memberPermissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        content: "You don't have permission to kick members.",
        ephemeral: true
      });
    }
    
    // Get member object and verify kickable status
    const targetMember = interaction.guild.members.cache.get(targetUser.id);
    if (!targetMember.kickable) {
      return interaction.reply({
        content: "I don't have permission to kick this user! They may have higher permissions than me.",
        ephemeral: true
      });
    }
    
    try {
      // Send notification DM to user
      let notificationStatus = "I couldn't send them a DM notification";
      
      try {
        await targetUser.send({
          content: `You have been kicked from **${guildName}**.\nReason: ${reason}`
        });
        console.log(`Sent DM to ${targetUser.tag} about their kick`);
        notificationStatus = "A DM notification was sent to the user";
      } catch (dmError) {
        console.error('Failed to send DM to the kicked user:', dmError);
      }
      
      // Execute the kick
      await targetMember.kick(reason);
      
      // Notify the moderator
      await interaction.reply({
        content: `Successfully kicked ${targetUser.tag} for reason: ${reason}\n ${notificationStatus}`,
        ephemeral: true
      });
    } catch (error) {
      console.error('Error kicking user:', error);
      await interaction.reply({
        content: `Failed to kick ${targetUser.tag}: ${error.message}`,
        ephemeral: true
      });
    }
  }
};
