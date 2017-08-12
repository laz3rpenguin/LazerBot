exports.run = async (bot, msg, suffix) => {
	msg.channel.send({
		embed: {
			author: {
                    name: `${bot.user.username}`,
                    icon_url: `${bot.user.avatarURL}`,
                    url: "https://github.com/laz3rpenguin/LazerBot"
			},
			color: 0x3669FA,
			description: `:wave: Hey! ${msg.author}. How's your day going! :wink:`,
		},
	});
};
