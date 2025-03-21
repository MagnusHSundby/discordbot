const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    execute: async function(interaction) {
        try {
            // First check if user has permission
            if (!interaction.memberPermissions.has(PermissionFlagsBits.BanMembers)) {
                return interaction.reply({
                    content: "You don't have permission to unban users.",
                    ephemeral: true
                });
            }
            
            // Get the user from options
            const targetUser = interaction.options.getUser('user');
            
            // Check if user was provided
            if (!targetUser) {
                return interaction.reply({
                    content: "You need to provide a valid user to unban.",
                    ephemeral: true
                });
            }
            
            const targetUserId = targetUser.id;
            
            await interaction.deferReply({ 
                ephemeral: true 
            });
            
            const guild = interaction.guild;

            // Check if the user is banned
            const bannedUsers = await guild.bans.fetch();
            const bannedUser = bannedUsers.find(ban => ban.user.id === targetUserId);

            if (!bannedUser) {
                return interaction.editReply({
                    content: `The user is not banned from this server.`,
                    ephemeral: true
                });
            }

            // Store user tag before unbanning
            const targetUserTag = bannedUser.user.tag;

            // Unban the user
            await guild.bans.remove(targetUserId, `Unbanned by: ${interaction.user.tag}`);
            
            return interaction.editReply({
                content: `Successfully unbanned ${targetUserTag}.`,
                ephemeral: true
            });
        } catch (e) {
            console.error("Unban error:", e);
            return interaction.editReply({
                content: `An error occurred while unbanning the user: ${e.message}`,
                ephemeral: true
            });
        }
    }
};