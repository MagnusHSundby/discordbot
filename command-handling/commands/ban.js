const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function(interaction) {
    // Get the user to ban
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const guildName = interaction.guild.name;
    
    // Check if the user has permission to ban
    if (!interaction.memberPermissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({
        content: "You don't have permission to ban members.",
        ephemeral: true
      });
    }
    
    // Get the GuildMember object
    const targetMember = interaction.guild.members.cache.get(targetUser.id);
    
    // Check if the bot can ban the user
    if (targetMember && !targetMember.bannable) {
      return interaction.reply({
        content: "I don't have permission to ban this user! They may have higher permissions than me.",
        ephemeral: true
      });
    }
    
    try {
      let dmSent = false;
      
      // Create the ban message
      let banMessage = `You have been banned from **${guildName}**.\nReason: ${reason}\nThis ban is permanent.`;
      
      // Send DM to the user before banning them
      try {
        await targetUser.send({
          content: banMessage
        });
        console.log(`Sent DM to ${targetUser.tag} about their ban`);
        dmSent = true;
      } catch (dmError) {
        console.error('Failed to send DM to the banned user:', dmError);
        // Continue with the ban even if DM fails
      }
      
      // Ban the user 
      await interaction.guild.members.ban(targetUser, {
        reason: reason
      });
      
      // Notify the moderator
      let replyMessage = `Successfully banned ${targetUser.tag} for reason: ${reason}\nThis ban is permanent.`;
      
      if (dmSent) {
        replyMessage += "\nA DM notification was sent to the user.";
      } else {
        replyMessage += "\n(Note: I couldn't send them a DM notification)";
      }
      
      await interaction.reply({
        content: replyMessage,
        ephemeral: true
      });
    } catch (error) {
      console.error('Error banning user:', error);
      await interaction.reply({
        content: `Failed to ban ${targetUser.tag}: ${error.message}`,
        ephemeral: true
      });
    }
  }
};