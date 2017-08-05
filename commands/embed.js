exports.run = async (bot, msg, suffix) => {
	if (suffix) {
		msg.channel.send({
			embed: {
				color: 0x3669FA,
				author: {
					name: `${msg.author.tag} requested an embed`,
					icon_url: msg.author.displayAvatarURL,
				},
				image: {
					url: suffix.trim(),
				},
			},
		});
	} else {
		msg.channel.send({
			embed: {
				color: 0xFF0000,
				description: `What do you want to embed? Preferably an image :smile:`,
			},
		});
	}
};
