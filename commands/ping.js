exports.run = async (bot, msg, suffix) => {
	const m = await msg.channel.send({
		embed: {
			color: 0x3669FA,
			description: `Grabbing Ping!`,
		},
	});
	return m.edit({
		embed: {
			color: 0x3669FA,
			description: `:ping_pong: **LazerBot** by **Lazer**. Pong! Latency: ${Math.floor(bot.ping)}ms`,
			footer: {
				text: `It took ${m.createdTimestamp - msg.createdTimestamp}ms send this message!`
			}
		}
	})
};
