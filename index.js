
// Importing required modules
const fs = require('node:fs'); // File system module
const path = require('node:path'); // Path module
const { Client, Collection, GatewayIntentBits } = require('discord.js'); // Discord.js library
// Client: Represents the Discord bot client and allows interaction with the Discord API.
// Collection: A data structure used to store and manage a collection of objects, such as the bot's commands.
// GatewayIntentBits: Allows you to choose which events your bot can receive from Discord by enabling specific intents.

const { token } = require('./config.json'); // Bot token stored in a separate configuration file

// Creating a Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // Creating a new instance of the Client class with specified intents
// GatewayIntentBits.Guilds indicates that the bot is interested in guild-related events, such as guild creation and updates.

client.commands = new Collection(); // Creating a collection to store bot commands

// Setting up command handling
const foldersPath = path.join(__dirname, 'commands'); // Path to the 'commands' directory
const commandFolders = fs.readdirSync(foldersPath); // Retrieving the list of folder names in the 'commands' directory (fun, moderation, utility, etcetc.)

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // Path to the current command folder
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Retrieving the list of JavaScript files in the current command folder
	
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file); // Path to the current command file
		const command = require(filePath); // Requiring (importing) the command from the current command file

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command); // Adding the command to the client.commands collection using the command's name as the key
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Setting up event handling
const eventsPath = path.join(__dirname, 'events'); // Path to the 'events' directory
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); // Retrieving the list of JavaScript files in the 'events' directory

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file); // Path to the current event file
	const event = require(filePath); // Requiring (importing) the event from the current event file
	
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args)); // Adding a one-time event listener that triggers the event's execute function
	} else {
		client.on(event.name, (...args) => event.execute(...args)); // Adding an event listener that triggers the event's execute function
	}
}

// Logging in the Discord bot
client.login(token); // Logging into Discord using the provided bot token