const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function (interaction) {
    try {
      // Defer reply immediately to prevent timeout
      await interaction.deferReply({ ephemeral: true });
      
      // Check permissions
      if (!interaction.memberPermissions.has(PermissionFlagsBits.ModerateMembers)) {
        return interaction.editReply({
          content: "You don't have permission to timeout members.",
        });
      }
      
      const targetUser = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason') || 'No reason provided';
      const duration = interaction.options.getString('duration') || '1h'; // Default to 1 hour if not specified
      const guildName = interaction.guild.name;
      
      const targetMember = await interaction.guild.members.fetch(targetUser.id);
      
      if (!targetMember.moderatable) {
        return interaction.editReply({
          content: "I don't have permission to timeout this user! They may have higher permissions than me."
        });
      }
      
      // Parse the duration (convert string like "1d" to milliseconds)
      const durationMs = parseDuration(duration);
      
      if (!durationMs) {
        return interaction.editReply({
          content: "Invalid duration format. Please use formats like '30s', '5m', '2h', '1d'."
        });
      }
      
      if (durationMs > 2419200000) { // Max timeout is 28 days (28 * 24 * 60 * 60 * 1000)
        return interaction.editReply({
          content: "Timeout duration cannot exceed 28 days."
        });
      }
      
      let dmSent = false;
      
      // Try to send DM to user
      try {
        // Format the duration for human reading
        const humanDuration = formatDuration(durationMs);
        
        await targetUser.send({
          content: `You have been timed out in **${guildName}** for ${humanDuration}.\nReason: ${reason}`
        });
        dmSent = true;
      } catch (dmError) {
        console.error('Failed to send DM to the timed out user:', dmError);
      }
      
      // Apply timeout
      await targetMember.timeout(durationMs, reason);
      
      // Format the duration for human reading in the confirmation message
      const humanDuration = formatDuration(durationMs);
      
      // Send confirmation
      await interaction.editReply({
        content: `Successfully timed out ${targetUser.tag} for ${humanDuration}.\nReason: ${reason}${
          dmSent ? "\nA DM notification was sent to the user." : "\n(Note: I couldn't send them a DM notification)"
        }`
      });
      
    } catch (error) {
      console.error('Error timing out user:', error);
      if (interaction.deferred) {
        await interaction.editReply({
          content: `Error timing out user: ${error.message}`
        });
      } else {
        await interaction.reply({
          content: `Error timing out user: ${error.message}`,
          ephemeral: true
        });
      }
    }
  }
};

// Helper function to parse duration strings like "1d", "2h", "30m", "45s"
function parseDuration(durationString) {
  const match = durationString.match(/^(\d+)([dhms])$/);
  if (!match) return null;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case 'd': return value * 24 * 60 * 60 * 1000; // days to ms
    case 'h': return value * 60 * 60 * 1000;      // hours to ms
    case 'm': return value * 60 * 1000;           // minutes to ms
    case 's': return value * 1000;                // seconds to ms
    default: return null;
  }
}

// Helper function to format duration in milliseconds to human readable string
function formatDuration(ms) {
  if (ms >= 86400000) { // days
    const days = Math.floor(ms / 86400000);
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (ms >= 3600000) { // hours
    const hours = Math.floor(ms / 3600000);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (ms >= 60000) { // minutes
    const minutes = Math.floor(ms / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else { // seconds
    const seconds = Math.floor(ms / 1000);
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
}
