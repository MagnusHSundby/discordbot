const axios = require('axios');
require('dotenv').config();

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: 'goat animal',
          image_type: 'photo',
          safesearch: true,
          per_page: 100
        }
      });
      
      const goatData = response.data;
      
      if (goatData.hits.length === 0) {
        return await interaction.editReply('Sorry, I couldn\'t find any goat pictures right now.');
      }
      const randomIndex = Math.floor(Math.random() * goatData.hits.length);
      const goatImageUrl = goatData.hits[randomIndex].largeImageURL;
      
      await interaction.editReply({ 
        content: 'Here\'s your goat picture from Pixabay!',
        files: [goatImageUrl] 
      });
    } catch (error) {
      console.error('Error fetching goat image:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a goat image right now.');
    }
  }
};
