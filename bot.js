const Discord = require("discord.js");
global.config = require("./config.js");
const commands = require("./commands.js");
require("./magic.js")();

exports.usage = {};

const bot = new Discord.Client({
	fetchAllMembers: true,
	disabledEvents: [
		"MESSAGE_DELETE_BULK",
		"TYPING_START",
	],
});

/*const switchPlayingGame = (user = bot.user) => {
	if (config.playingQuotes.length > 2) {
		let randomQuote = Math.floor(Math.random() * config.playingQuotes.length);
		//console.log(`Changed my playing quote to "${config.playingQuotes[randomQuote]}"`);
		//bot.user.setPresence({ streaming: { name: `/help | v0.1(PR)`, type: 0 } })
		//user.setGame(config.playingQuotes[randomQuote]);
		//user.setGame({ game: { streaming: `/help | v0.1(PR)`, type: 0 } })
		setTimeout(switchPlayingGame, 450000);
		//user.setGame({game: { name: "/help v0.1(PR)", url: "https://www.twitch.tv/meme", type: 2}})
		user.setGame('/help - v0.1, "https://www.twitch.tv/meme")
	}
} */
bot.login(config.token).then(token => {
	console.log("I'm online");
}).catch(err => {
	console.error(`Theres been an error dammit!\n`, err);
});

bot.once("ready", () => {
	console.log(`I'm in ${bot.guilds.size} guilds with ${bot.users.size} total users.`);
	//bot.user.setPresence({game: { name: "/help v0.1(PR)", url: "https://www.twitch.tv/meme", type: 1}})
	bot.user.setGame('/help | v0.1 (PR)', 'https://www.twitch.tv/#');
	for (const command in commands) {
		exports.usage[command] = 0;
	}
	exports.usage.total = 0;
});

bot.on("message", async msg => {
	if (msg.content.toLowerCase().trim() === "me me big boy") {
		return msg.channel.send({
			embed: {
				color: 0x3669FA,
				description: `me me big BOT ${msg.author}`,
			},
		});
	}
	if (msg.content.startsWith(config.prefix)) {
		/*
		 * Any complains about my code will be ignored kek
		 */
		let cmd = msg.content.substring(config.prefix.length).split(" ")[0].trim().toLowerCase();
		let suffix = msg.content.substring(cmd.length + 2).trim();
		for (const command in commands) {
			if (cmd === command) {
				exports.usage[command]++;
				exports.usage.total++;
				try {
					await msg.delete();
				} catch (err) {
					// Ignore Error
				}
				if (commands[command].maintainer) {
					if (config.maintainers.includes(msg.author.id)) {
						try {
							console.log(`${msg.author.tag} ran ${command} in ${msg.guild.name}`);
							return await require(`./commands/${command}.js`).run(bot, msg, suffix);
						} catch (err) {
							console.error(err);
						}
					} else {
						console.error(`Blocked ${msg.author.tag} from running ${command} as he / she isn't a maintainer.`);
					}
				} else {
					try {
						console.log(`${msg.author.tag} ran ${command} in ${msg.guild.name}`);
						return await require(`./commands/${command}.js`).run(bot, msg, suffix);
					} catch (err) {
						console.error(err);
					}
				}
			}
			for (const alias of commands[command].aliases) {
				if (cmd === alias) {
					exports.usage[command]++;
					exports.usage.total++;
					try {
						await msg.delete();
					} catch (err) {
						// Ignore Error
					}
					if (commands[command].maintainer) {
						if (config.maintainers.includes(msg.author.id)) {
							try {
								console.log(`${msg.author.tag} ran ${command} in ${msg.guild.name}`);
								await require(`./commands/${command}.js`).run(bot, msg, suffix);
							} catch (err) {
								console.error(err);
							}
						} else {
							console.error(`Blocked ${msg.author.tag} from running ${command} as he / she isn't a maintainer.`);
						}
					} else {
						try {
							console.log(`${msg.author.tag} ran ${command} in ${msg.guild.name}`);
							await require(`./commands/${command}.js`).run(bot, msg, suffix);
						} catch (err) {
							console.error(err);
						}
					}
				}
			}
		}
	}
});
