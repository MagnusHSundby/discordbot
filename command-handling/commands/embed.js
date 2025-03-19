const { EmbedBuilder } = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      const title = interaction.options.getString('title');
      const description = interaction.options.getString('description');
      const colorInput = interaction.options.getString('color');
      
      let color;
      if (colorInput && colorInput.startsWith('#')) {
        color = colorInput;
      } else {
        const colorMap = {
          red: '#FF0000',
          blue: '#0000FF',
          green: '#00FF00',
          yellow: '#FFFF00',
          purple: '#800080',
          pink: '#FFC0CB',
          orange: '#FFA500',
          black: '#000000',
          white: '#FFFFFF',
          aqua: '#00FFFF',
          gold: '#FFD700',
        };
        
        color = colorMap[colorInput.toLowerCase()] || '#5865F2'; 
      }
      
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
      
      await interaction.reply({ 
        embeds: [embed], 
        ephemeral: true 
      });
      
    } catch (error) {
      console.error('Error creating embed:', error);
      await interaction.reply({
        content: 'There was an error creating your embed. Please check your inputs and try again.',
        ephemeral: true
      });
    }
  }
};