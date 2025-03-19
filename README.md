# Discord Bot

This is a Discord bot written in JavaScript using Node.js and the Discord.js library. It started as a school project to learn JavaScript and is still being developed as part of that learning process.

## Setup

To run this bot, you need to create a `.env` file in the root directory and provide the necessary credentials:

### Required Environment Variables:
```env
DISCORD_TOKEN=your-discord-bot-token
GUILD_ID=your-discord-server-id
CAT_API_KEY=your-api-key  # Required if you wish to use the cat command
```

### Installation Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/discord-bot.git
   cd discord-bot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your credentials (see above).
4. Start the bot use the following in your terminal inside of the directory:
   ```sh
   node index.js
   ```
5. If you want to deploy new commands, you need to run:
   ```sh
   node register-commands.js
   ```

## Features
- Basic command handling
- Fun commands like the `cat` command (requires API key)
- Server-specific functionality

## Dependencies
- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/)

## Notes
This bot is still a school project aimed at learning JavaScript and Discord bot development.


