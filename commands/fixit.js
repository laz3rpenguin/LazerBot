exports.run = async (bot, msg, suffix) => {
	msg.channel.send({
		embed: {
			author: {
                    name: `${bot.user.username}`,
                    icon_url: `${bot.user.avatarURL}`,
                    url: "https://github.com/laz3rpenguin/LazerBot"
			},
			color: 0x3669FA,
			description: `:gear: Found an error? Submit an Issue on the [GitHub](https://github.com/laz3rpenguin/LazerBot) page!`,
		},
	});
};
