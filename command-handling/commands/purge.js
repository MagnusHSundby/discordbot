const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    execute: async function(interaction, client) {
        const amount = interaction.options.getInteger('amount');
        
        if (!interaction.memberPermissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({
                content: "You don't have permission to use this command.",
                ephemeral: true
            });
        }
        
        if (amount < 1 || amount > 100) {
            return interaction.reply({
                content: 'The amount of messages to delete must be between 1 and 100.',
                ephemeral: true
            });
        }
        
        // Defer the reply to give time for the delete process
        await interaction.deferReply({ 
            ephemeral: true 
        });
        
        try {
            const messages = await interaction.channel.messages.fetch({ limit: amount });
            await interaction.channel.bulkDelete(messages);
            
            console.log(`Deleted ${messages.size} messages in #${interaction.channel.name}`);
            
            // Notify Staff
            await interaction.editReply({
                content: `Successfully deleted ${messages.size} messages.`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error deleting messages:', error);
            await interaction.editReply({
                content: `Failed to delete messages: ${error.message}`,
                ephemeral: true
            });
        }
    }
};