# Discord Bot

This is a Discord bot written in JavaScript using Node.js and the Discord.js library. It started as a school project to learn JavaScript and is still being developed as part of that learning process.

## Setup

To run this bot, you need to create a `.env` file in the root directory and provide the necessary credentials:



### Installation Steps
1. Clone this repository into a befitting directory:
   - navigate to your directory
   ```sh
   git clone https://github.com/MagnusHSundby/discordbot.git
   ```
2. To run this bot, you need to create a `.env` file in the root directory and provide the necessary credentials:

### Required Environment Variables:
```env
DISCORD_TOKEN=your-discord-bot-token
GUILD_ID=your-discord-server-id # Used to quickly update slash commands in a specific server, or else they will need up to 1 hour to load
CAT_API_KEY=your-api-key  # Required if you wish to use the cat command, https://thecatapi.com/
DOG_API_KEY=your-apy-key # Required if you wish to use the cat command, https://thedogapi.com/
```

3. To start the bot use the following in your terminal inside of the directory:
   ```sh
   node index.js
   ```
4. If you want to deploy new commands, you need to run:
   ```sh
   node register-commands.js
   ```

## Features
- Basic command handling
- Fun commands like the `cat` and `dog` command (requires API key)
- Server-specific functionality

## Dependencies
- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/)

## Notes
This bot is still a school project aimed at learning JavaScript and Discord bot development.


