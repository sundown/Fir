const Discord = require("discord.js");
require("./util/extensions.js");

const Fir = new Discord.Client({
    messageCacheMaxSize: 50,
    messageCacheLifetime: 60,
    messageSweepInterval: 180,
    fetchAllMembers: true,
    disableMention: "everyone"
  });

Fir.config = require("./config.json");
Fir.isMaster = (id) => require("./util/isMaster.js")(Fir, id);

Fir.login(Fir.config.token).then(() => Fir.config.token = "token");

Fir.commands = new Discord.Collection()
  .set("debug",   require("./commands/debug.js"))
  .set("pfp",     require("./commands/avatar.js"))
  .set("colour",  require("./commands/colour.js"))
  .set("eval",    require("./commands/eval.js"));

Fir
  .on("ready", () => console.log(`${Fir.user.username} started`))
  .on("message", (message) => Fir.messageHandle(message));

Fir.messageHandle = (message) => {
  if (message.author.bot || !message.content.length) { return; }

  const msg = message.content.split(" ");


  if ((command = Fir.commands
    .get(msg[0]
      .toLowerCase()
      .substring(Fir.config.prefix.length)))) {
    command(Fir, message, msg.slice(1), Discord);
  }
}
