const { OpenAI } = require('openai');

module.exports = {
  execute: async function(interaction) {
    await interaction.deferReply(); 
    
    const prompt = interaction.options.getString('prompt'); 
    const resolution = interaction.options.getString('resolution') || '1024x1024';
    if (!prompt) {
      return await interaction.editReply('did you really think you could get away with not providing a prompt?');
    }
    
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: resolution,
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
      await interaction.editReply('Sorry, I encountered an error while generating your image. The issue might lie with the prompt you provided.');
    }
  }
};