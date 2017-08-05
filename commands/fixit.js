exports.run = async (bot, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x3669FA,
			description: `:gear: Found an error? Submit an Issue on the GitHub page!`,
		},
	});
};
