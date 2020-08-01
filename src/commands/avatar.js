module.exports = (Fir, message, args, Discord) => {
  const user = message.fetchUser({ notSelf: false });

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor(message?.guild.me.colour())
      .setDescription(`**${user.username}**'s avatar:`)
      .setImage(user.avatarURL({ size: 2048 }))
  );
}
