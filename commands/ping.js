exports.run = async (bot, msg, suffix) => {
	const m = await msg.channel.send({
		embed: {
			author: {
                    name: `${bot.user.username}`,
                    icon_url: `${bot.user.avatarURL}`,
                    url: "https://github.com/laz3rpenguin/LazerBot"
			},		
			color: 0x3669FA,
			description: `Grabbing Ping!`,
		},
	});
	return m.edit({
		embed: {
			author: {
                    name: `${bot.user.username}`,
                    icon_url: `${bot.user.avatarURL}`,
                    url: "https://github.com/laz3rpenguin/LazerBot"
			},		
			color: 0x3669FA,
			description: `:ping_pong: **LazerBot** by **Lazer**. Pong! Latency: ${Math.floor(bot.ping)}ms`,
			footer: {
				text: `It took ${m.createdTimestamp - msg.createdTimestamp}ms send this message!`
			}
		}
	})
};
