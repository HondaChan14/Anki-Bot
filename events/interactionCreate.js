const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate, // The name of the event is set to 'InteractionCreate', indicating the event occurs when a user interacts with the bot
	async execute(interaction) { // The function that will be executed when the event occurs, with the interaction object passed as an argument
		if (!interaction.isChatInputCommand()) return; // If the interaction is not a chat input command, return and do nothing

		const command = interaction.client.commands.get(interaction.commandName); // Get the command associated with the interaction's command name

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`); // If no command is found, log an error message and return
			return;
		}

		try {
			await command.execute(interaction); // Execute the command's execute function with the interaction object as an argument
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`); // If an error occurs during command execution, log an error message
			console.error(error);
		}
	},
};
