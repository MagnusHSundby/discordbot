const pingCommand = require('./commands/ping');
const kickCommand = require('./commands/kick');
const sendDmCommand = require('./commands/senddm');
const ban = require('./commands/ban');
const cat = require('./commands/cat');
const purge = require('./commands/purge');
const mute = require('./commands/mute');
const unmute = require('./commands/unmute');
const embed = require('./commands/embed');
const dog = require('./commands/dog');
const unban = require('./commands/unban');
const help = require('./commands/help');
const goat = require('./commands/goat');
const raccoon = require('./commands/raccoon');


function setupCommandHandlers(client) {
  // Create a map of command names to their handler functions
  const commandHandlers = {
    ping: pingCommand.execute,
    kick: kickCommand.execute,
    senddm: (interaction) => sendDmCommand.execute(interaction, client),
    ban: ban.execute,
    cat: cat.execute,
    dog: dog.execute,
    purge: purge.execute,
    mute: mute.execute,
    unmute: (interaction) => unmute.execute(interaction, client),
    embed: embed.execute,
    unban: unban.execute,
    help: help.execute,
    goat: goat.execute,
    raccoon: raccoon.execute,
  };

  // Handle slash command interactions
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;
    const { user } = interaction;
    console.log(`Received command from ${user}: ${commandName}`);

    // Check if we have a handler for this command
    if (commandHandlers[commandName]) {
      try {
        await commandHandlers[commandName](interaction);
      } catch (error) {
        console.error(`Error executing ${commandName} command:`, error);
        // Send error message if interaction hasn't been replied to
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: 'There was an error executing this command!',
            ephemeral: true
          });
        } else if (interaction.deferred) {
          await interaction.editReply({
            content: 'There was an error executing this command!'
          });
        }
      }
    } else {
      console.log(`Unknown command: ${commandName}`);
    }
  });
}

module.exports = { setupCommandHandlers };