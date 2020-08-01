const Discord = require("discord.js");

Discord.Structures.extend("TextChannel", (TextChannel) => {
  return class extends TextChannel {
    constructor (guild, data) {
      super (guild, data);
      this.embed = (body) => {
        if (!body || !String(body)) {
          throw "textChannelEmbed: no body provided to embed method";
        }

        this.send(new Discord.MessageEmbed()
          .setDescription(body.substring(0, 2048))
          .setColor(!["#000000", "#ffffff"].includes(this?.guild.me.displayHexColor)
            ? this.guild.me.displayHexColor
            : "#ffffff"
          )
        );
      };
    }
  };
});


Discord.Structures.extend("GuildMember", (GuildMember) => {
  return class extends GuildMember {
    constructor (client, data, guild) {
      super (client, data, guild);
      this.colour = (options) => {
        options == options || {};

        return this.displayHexColor != "#000000"
          ? this.displayHexColor
          : "#ffffff"
      }
    }
  };
});


Discord.Structures.extend("Message", Message => {
  return class extends Message {
    constructor (client, data, channel) {
      super (client, data, channel);
      this.fetchUser = options => {
        options = options || {};
        let args = this.content.split(" ").slice(1), user;
        try {
          if (this.mentions.users.size) {
            user = this.mentions.users.first();
          } else if (!isNaN(args.join(" "))) {
            if (client.users.cache.get(args.join(" "))) {
              user = client.users.cache.get(args.join(" "));
            }
          } else if (args[0]) {
            if ((user = this.guild.members.cache.find(m => m.displayName.toLowerCase() === args.join(" ").toLowerCase()))) {
              user = user.user;
            } else if ((user = this.guild.members.cache.find(m => m.user.username.toLowerCase() === args.join(" ").toLowerCase()))) {
              user = user.user;
            }
          }
        } finally {
          if (!user || user === this.author) {
            if (options.notSelf) {
              user = null;
            } else {
              user = this.author;
            }
          }

          return options.member
            ? this.guild.members.cache.get(user)
            : user;
        }
      };
    }
  }
});

Object.assign(String.prototype, {
  toTitleCase() {
    return this.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
});
