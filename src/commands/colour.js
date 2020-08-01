const ctn = require('color-to-name');
module.exports = (Fir, message, args, Discord) => {
  if (!args.length) {
    return message.channel.embed("**Error**, colour: zero-length input");
  }

  if (args.length > 5) {
    return message.channel.embed("**Error**, colour: maximum 5 args")
  }

  args.forEach(a => {
    const colour = a[0].includes('#') ? a : `#${a}`;

    if (!ctn.isValidHexCode(colour) || colour.length > 7) {
      return message.channel.embed(`**Error**, colour: invalid \`${colour}\``);
    }

    message.channel.send(new Discord.MessageEmbed()
      .setColor(colour === "#ffffff" ? "fffffe" : colour)
      .addField(ctn.findClosestColor(colour).name.toTitleCase(), `\`${colour}\``)
      .setThumbnail(`http://colorate.azurewebsites.net/SwatchColor/${colour.replace('#', '')}`));
  });
}
