const axios = require('axios');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: 'raccoon animal',
          image_type: 'photo',
          safesearch: true,
          per_page: 100
        }
      });
      
      const raccoonData = response.data;
      
      if (raccoonData.hits.length === 0) {
        return await interaction.editReply('Sorry, I couldn\'t find any raccoon pictures right now.');
      }
      const randomIndex = Math.floor(Math.random() * raccoonData.hits.length);
      const raccoonImageUrl = raccoonData.hits[randomIndex].largeImageURL;
      
      await interaction.editReply({ 
        content: 'Here\'s your raccoon picture from Pixabay!',
        files: [raccoonImageUrl] 
      });
    } catch (error) {
      console.error('Error fetching raccoon image:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a raccoon image right now.');
    }
  }
};
