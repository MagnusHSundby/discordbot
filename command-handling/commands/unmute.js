const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    execute: async function(interaction, client) {
        const targetUser = interaction.options.getUser('user');
        const messageToUser = interaction.options.getString('message'); // Get optional message
        
        if (!interaction.memberPermissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: "You don't have permission to remove timeouts.",
                ephemeral: true
            });
        }
        
        // Defer the reply to give time for the process
        await interaction.deferReply({ 
            ephemeral: true 
        });
        
        try {
            const guild = interaction.guild;
            const guildName = guild.name;
            
            // Force refresh the member to get updated status
            const member = await guild.members.fetch(targetUser.id, { force: true });
            
            if (!member) {
                return interaction.editReply({
                    content: `Could not find the member in this server.`,
                    ephemeral: true
                });
            }
            
            if (!member.moderatable) {
                return interaction.editReply({
                    content: "I don't have permission to remove timeout from this user. They may have higher permissions than me.",
                    ephemeral: true
                });
            }
            
            // Check if the user is actually timed out
            if (!member.communicationDisabledUntil) {
                return interaction.editReply({
                    content: "This user is not currently timed out.",
                    ephemeral: true
                });
            }
            
            // Remove the timeout by setting it to null
            await member.timeout(null, "Timeout removed by: " + interaction.user.tag);
            
            console.log(`Removed timeout from ${member.user.tag}`);
            
            // Send DM to the user
            let dmStatus = "";
            try {
                // Create the DM content - only include the message if provided
                const dmContent = `Your timeout in **${guildName}** has been removed.${messageToUser ? `\nMessage: ${messageToUser}` : ''}`;
                
                await targetUser.send({ content: dmContent });
                
                // Update the DM status based on whether a custom message was included
                dmStatus = messageToUser 
                    ? "\nA notification with your message was sent to the user." 
                    : "\nA notification was sent to the user.";
                    
                console.log(`Sent unmute notification DM to ${targetUser.tag}`);
            } catch (dmError) {
                console.error('Failed to send DM to the user:', dmError);
                dmStatus = "\n(Note: I couldn't send them a DM notification)";
            }
            
            await interaction.editReply({
                content: `Successfully removed timeout from ${member.user.tag}.${dmStatus}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error removing timeout:', error);
            await interaction.editReply({
                content: `Failed to remove timeout: ${error.message}`,
                ephemeral: true
            });
        }
    }
}