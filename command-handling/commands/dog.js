const axios = require('axios');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: 'dog animal',
          image_type: 'photo',
          safesearch: true,
          per_page: 100
        }
      });
      
      const dogData = response.data;
      
      if (dogData.hits.length === 0) {
        return await interaction.editReply('Sorry, I couldn\'t find any dog pictures right now.');
      }
      const randomIndex = Math.floor(Math.random() * dogData.hits.length);
      const dogImageUrl = dogData.hits[randomIndex].largeImageURL;
      
      await interaction.editReply({ 
        content: 'Here\'s your dog picture from Pixabay!',
        files: [dogImageUrl] 
      });
    } catch (error) {
      console.error('Error fetching dog image:', error);
      await interaction.editReply('Sorry, I couldn\'t fetch a dog image right now.');
    }
  }
};
