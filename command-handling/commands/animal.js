const axios = require('axios');

module.exports = {
  async execute(interaction) {
    await interaction.deferReply();
    
    try {      
      const animal = interaction.options.getString('animal');
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: process.env.PIXABAY_API_KEY,
          q: `${animal} animal`,
          image_type: 'photo',
          safesearch: true,
          per_page: 100
        }
      });
      
      const animalData = response.data;
      
      if (animalData.hits.length === 0) {
        return await interaction.editReply(`Sorry, I couldn't find any ${animal} pictures right now.`);
      }
      const randomIndex = Math.floor(Math.random() * animalData.hits.length);
      const animalImageUrl = animalData.hits[randomIndex].largeImageURL;
      
      await interaction.editReply({ 
        content: `Here's your ${animal} picture from Pixabay!`,
        files: [animalImageUrl] 
      });
    } catch (error) {
      console.error(`Error fetching ${interaction.options.getString('animal')} image:`, error);
      await interaction.editReply(`Sorry, I couldn't fetch a ${interaction.options.getString('animal')} image right now.`);
    }
  }
};
