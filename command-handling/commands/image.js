const { OpenAI } = require('openai');

module.exports = {
  execute: async function(interaction) {
    await interaction.deferReply(); 
    
    const prompt = interaction.options.getString('prompt'); 
    
    if (!prompt) {
      return await interaction.editReply('Please provide a prompt for image generation.');
    }
    
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      });

      const imageUrl = response.data[0].url;
      
      await interaction.editReply({
        content: `Here's your generated image for: "${prompt}"`,
        files: [{
          attachment: imageUrl,
          name: 'generated-image.png'
        }]
      });
      
    } catch (error) {
      console.error('Error generating image:', error);
      await interaction.editReply('Sorry, I encountered an error while generating your image.');
    }
  }
};