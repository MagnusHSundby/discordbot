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

client.once('ready', () => {
  console.log('Bot is ready!');
});

setupCommandHandlers(client);

client.login(process.env.DISCORD_BOT_ID);