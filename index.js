require('dotenv').config();
const {
  Client,
  GatewayIntentBits
} = require('discord.js');
const { setupCommandHandlers } = require('./command-handling');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// logs message to console when bot is ready
client.once('ready', () => {
  console.log('Bot is ready!');
});

// Set up command handlers
setupCommandHandlers(client);

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_ID);