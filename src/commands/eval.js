module.exports = (Fir, message, args, Discord) => {
  if (!Fir.isMaster(message.author.id)) {
    message.channel.embed("**Error**, eval: not permissible");
  }

  if (!args.length) {
    return message.channel.embed("**Error**, eval: zero-length input");
  }

  let output;

  try {
   output = "```js\n" + require("util")
    .inspect(eval(args.join(" ")))
    .substring(0, 2039)
    .replace(new RegExp(Fir.config.token.replace(/\./g, "."), "g"), "token") + "```";
  } catch (error) {
    output = "```js\n" + error + "```";
  } finally {
    message.channel.embed(output);
  }
}
