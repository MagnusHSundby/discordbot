const axios = require('axios');

module.exports = {

    async execute(interaction) {
        await interaction.deferReply(); 
        
        const prompt = interaction.options.getString('message'); 
        
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 500
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            const aiResponse = response.data.choices[0].message.content;
            
            if (aiResponse.length <= 2000) {
                await interaction.editReply(aiResponse);
            } else {
                await interaction.editReply(aiResponse.substring(0, 1997) + '...');
            }
            
        } catch (error) {
            console.error('Error fetching AI response:', error);
            await interaction.editReply('Sorry, I encountered an error processing your request.');
        }
    },
};