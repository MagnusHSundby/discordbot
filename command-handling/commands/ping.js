module.exports = {
  execute: async function(interaction) {
    await interaction.reply({
      content: 'pong',
      ephemeral: false
    });
  }
};