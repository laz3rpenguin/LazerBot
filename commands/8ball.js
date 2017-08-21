exports.run = async (bot, msg, suffix) => {
	const fortunes = [
		"Yes",
		"No",
		"Maybe",
		"Try again",
		"Possibly"
	];
	msg.channel.send({
		embed: {
			author: {
				name: `${bot.user.username}`,
            	icon_url: `${bot.user.avatarURL}`,
                url: "https://github.com/laz3rpenguin/LazerBot"
			},                    
			color: 0x3669FA,
			title: "The 8ball says...",
			description: fortunes[Math.floor(Math.random() * fortunes.length)],
		},
	});
};
	



