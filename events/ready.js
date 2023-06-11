const { Events } = require('discord.js'); // Importing the Events class from the discord.js library
// The Events class from discord.js provides pre-defined event names for easier referencing and handling of specific events in a Discord bot.

module.exports = {
  name: Events.ClientReady, // The name of the event is set to 'ClientReady', indicating the event occurs when the client is ready
  once: true, // This event listener will be triggered only once
  execute(client) { // The function that will be executed when the event occurs, with the client object passed as an argument
    console.log(`Ready! Logged in as ${client.user.tag}`); // Outputting a message to the console indicating that the bot is ready and displaying the bot's username with the user.tag property
    },
};