module.exports = (Fir, message, args, Discord) => {
  if (!Fir.isMaster(message.author.id)) {
    message.channel.embed("**Error**, debug: not permissible");
  }

  message.channel.embed(`\`\`\`
Heap:   ${Math.round(process.memoryUsage().heapTotal / 100000000 * 100)}MB
Users:  ${Fir.users.cache.size}
Uptime: ${require("ms")(Fir.uptime)}
Node:   ${process.versions.node}
V8:     ${process.versions.v8}
Host:   ${process.platform} ${process.arch}\`\`\``);
}
