require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

const TOKEN = process.env.DISCORD_BOT_ID;
const GUILD_ID = process.env.GUILD_ID || '';

if (!TOKEN) {
  console.error('Error: DISCORD_BOT_ID is not set in the .env file');
  process.exit(1);
}

// Build the commands
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    
    ,
  
  new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a user from the server')
    .addUserOption(option => 
      option
        .setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for kicking the user')
        .setRequired(true)
    )

    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    
    ,
  
  new SlashCommandBuilder()
    .setName('senddm')
    .setDescription('Sends a direct message to a specific user')
    .addStringOption(option =>
      option
        .setName('userid')
        .setDescription('The ID of the user to DM')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to send to the user')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) 

  ,
   
  new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Bans a user from the server')
  .addUserOption(option => 
    option
      .setName('user')
      .setDescription('The user to ban')
      .setRequired(true)
  )
  .addStringOption(option =>
    option 
      .setName('reason')
      .setDescription('Reason for banning the user')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ,

  new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Unbans a user from the server')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to unban')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  ,

  new SlashCommandBuilder()
  .setName('cat')
  .setDescription('Sends a random cat image')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,

  new SlashCommandBuilder()
  .setName('dog')
  .setDescription('Sends a random dog image')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,

  new SlashCommandBuilder()
  .setName('raccoon')
  .setDescription('Sends a random raccoon image')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,
  
  new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Purges messages from a channel')
  .addIntegerOption(option =>
    option
      .setName('amount')
      .setDescription('The number of messages to delete')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.KickMembers, PermissionFlagsBits.BanMembers)

  ,
  new SlashCommandBuilder()
  .setName('mute')
  .setDescription('Times out a user')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to timeout')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('reason')
      .setDescription('Reason for timing out the user')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('duration')
      .setDescription('Duration (e.g. 30s, 5m, 2h, 1d)')
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
  
  ,
  new SlashCommandBuilder()
  .setName('unmute')
  .setDescription('Unmutes a user')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('The user to unmute')
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('a message to the user')
      .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)   

  ,
  new SlashCommandBuilder()
      .setName('embed')
      .setDescription('Sends an embed message')
      .addStringOption(option =>
        option
          .setName('title')
          .setDescription('The title of the embed')
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName('description')
          .setDescription('The description of the embed')
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName('color')
          .setDescription('The color of the embed')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks)
  ,

  new SlashCommandBuilder()
  .setName('help')
  .setDescription('Shows all available commands')
  
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,

  new SlashCommandBuilder()
  .setName('goat')
  .setDescription('Sends a random goat image')
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,

  new SlashCommandBuilder()
  .setName('animal')
  .setDescription('Sends a request for a specific animal image')
  .addStringOption(option =>
    option
      .setName('animal')
      .setDescription('The animal to search for')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,
  
  new SlashCommandBuilder()
  .setName('lockdown')
  .setDescription('Locks down a channel')
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('The channel to lock down')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels, PermissionFlagsBits.Administrator)
  ,

  new SlashCommandBuilder()
  .setName('openlockdown')
  .setDescription('Removes a channel lockdown')
  .addChannelOption(option =>
    option
      .setName('channel')
      .setDescription('The channel to unlock')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels, PermissionFlagsBits.Administrator)
  ,

  new SlashCommandBuilder()
  .setName('ai')
  .setDescription('Talk to an AI')
  .addStringOption(option =>
    option
      .setName('message')
      .setDescription('The message to send to the AI')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,

  new SlashCommandBuilder()
  .setName('image')
  .setDescription('Ai generates an image')
  .addStringOption(option =>
    option
      .setName('prompt')
      .setDescription('The prompt for the image')
      .setRequired(false)
  )
  .addStringOption(option =>
    option
      .setName('resolution')
      .setDescription('The resolution of the image')
      .addChoices(
        { name: '1024x1024', value: '1024x1024' },
        { name: '1792x1024', value: '1792x1024' },
        { name: '1024x1792', value: '1024x1792' }
      )
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
  ,
];
  

const commandsJSON = commands.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');
    
    // Get the application ID from the bot itself
    const applicationInfo = await rest.get(Routes.oauth2CurrentApplication());
    const clientId = applicationInfo.id;
    
    console.log(`Using Client ID: ${clientId}`);

    // Register commands to a specific guild (server) for testing
    if (GUILD_ID) {
      console.log(`Registering commands to guild: ${GUILD_ID}`);
      await rest.put(
        Routes.applicationGuildCommands(clientId, GUILD_ID),
        { body: commandsJSON }
      );
      console.log(`Successfully registered guild commands for ${GUILD_ID}`);
    }
    
    // Register commands globally
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commandsJSON }
    );
    console.log('Successfully registered global application commands.');
    
  } catch (error) {
    console.error('Error registering commands:', error);
  }
}

registerCommands();