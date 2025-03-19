const axios = require('axios');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
        headers: {
          'x-api-key': process.env.DOG_API_KEY
        }
      });
      
      const catData = response.data[0];
      const catImageUrl = catData.url;
      
      await interaction.editReply({ 
        content: 'Here\'s your dog picture!',
        files: [catImageUrl] 
      });
    } catch (error) {
      console.error('Error fetching dog image:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a dog image right now.');
    }
  }
};
