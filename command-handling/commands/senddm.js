const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  execute: async function(interaction, client) {
    const userId = interaction.options.getString('userid');
    const messageContent = interaction.options.getString('message');
    
    if (!interaction.memberPermissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }
    
    // Defer the reply to give time for the DM process
    await interaction.deferReply({ 
      ephemeral: true 
    });
    
    try {
      const user = await client.users.fetch(userId).catch(error => {
        console.error('Error fetching user:', error);
        return null;
      });
      
      if (!user) {
        return interaction.editReply({
          content: `Could not find a user with ID: ${userId}. Make sure the ID is correct.`,
          ephemeral: true
        });
      }
      
      await user.send({
        content: messageContent
      });
      
      console.log(`Sent DM to ${user.tag} (${userId}): ${messageContent}`);
      
      // Notify Staff
      await interaction.editReply({
        content: `Successfully sent a direct message to ${user.tag} (${userId}) Message: "${messageContent}"`,
        ephemeral: true
      });
    } catch (error) {
      console.error('Error sending DM:', error);
      await interaction.editReply({
        content: `Failed to send direct message: ${error.message}. The user may have DMs disabled, has blocked the bot or is not in the server.`,
        ephemeral: true
      });
    }
  }
};
