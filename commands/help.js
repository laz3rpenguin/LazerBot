/* eslint-disable max-len*/
const commands = require(`../commands.js`);
exports.run = async (bot, msg, suffix) => {
	if (suffix) {
		const template = (cmd, aliases, usage, maintainer) => {
			let string = `**»** Help for command **${cmd}**\nUsage: \`${usage !== "" ? usage : "No usage"}\`\nAliases: \`${aliases.join(", ")}\`\nMaintainer Only: ${maintainer}`;
			return string;
		};
		for (const command in commands) {
			if (suffix.toLowerCase().trim() === command) {
				return msg.channel.send({
					embed: {
						description: template(command, commands[command].aliases, commands[command].usage, commands[command].maintainer),
						color: 0x3669FA,
					},
				});
			}
			for (const alias of commands[command].aliases) {
				if (suffix.toLowerCase().trim() === alias) {
					return msg.channel.send({
						embed: {
							color: 0x3669FA,
							description: template(command, commands[command].aliases, commands[command].usage, commands[command].maintainer),
						},
					});
				}
			}
		}
	} else {
		const output = [];
		const template = (cmd, aliases, usage, maintainer) => {
			const string = `**»** ${cmd}\nAliases: \`${aliases.join(", ")}\`\nUsage: \`${usage !== "" ? usage : "No usage"}\`\nMaintainer Only: ${maintainer}`;
			return string;
		};
		for (const command in commands) {
			output.push(template(command, commands[command].aliases, commands[command].usage, commands[command].maintainer));
		}
		if (output.join("\n").length > 1980) {
			const split = output.chunk(10);
			for (const splitted of split) {
				msg.author.send({
					embed: {
						color: 0x3669FA,
						description: splitted.join("\n"),
					},
				});
			}
		} else {
			msg.author.send({
				embed: {
					color: 0x3669FA,
					description: output.join("\n"),
				},
			});
		}
	}
};
