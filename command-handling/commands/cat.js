const axios = require('axios');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: 'cat animal',
          image_type: 'photo',
          safesearch: true,
          per_page: 100
        }
      });
      
      const catData = response.data;
      
      if (catData.hits.length === 0) {
        return await interaction.editReply('Sorry, I couldn\'t find any cat pictures right now.');
      }
      const randomIndex = Math.floor(Math.random() * catData.hits.length);
      const catImageUrl = catData.hits[randomIndex].largeImageURL;
      
      await interaction.editReply({ 
        content: 'Here\'s your cat picture from Pixabay!',
        files: [catImageUrl] 
      });
    } catch (error) {
      console.error('Error fetching cat image:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a cat image right now.');
    }
  }
};
