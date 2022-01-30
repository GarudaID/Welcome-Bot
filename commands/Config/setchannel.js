const db = require("old-wio.db");

module.exports.help = {
  name: "setchannel",
  aliases: ["setch", "sc"],
  category: "Config",
  description: "Set The Welcome Or Goodbye Message Channel!",
  usage: "Setchannel <Mention Channel> <Type>",
  run: async ({ message, args, Color }) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        "You Don't Have Enough Permission To Execute This Command - Manage Channels"
      );

    const mentionedChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);

    if (!mentionedChannel || mentionedChannel.type === "voice")
      return message.channel.send(`<a:warning:936828682897621092>\`Tolong Berikan Channel yang Valid!\``);

    const Welcome = ["welcome", "wel", "join"],
      Goodbye = ["goodbye", "leave", "left"];

    if (
      !args[1] ||
      ![...Welcome, ...Goodbye].find((T) => T === args[1].toLowerCase())
    )
      return message.channel.send(
        `\`Tolong Berikan Jenis Yang Valid\` - **${[...Welcome, Goodbye].join(", ")}**`
      );

    const Current = Welcome.some((wel) => wel === args[1].toLowerCase())
      ? "Welcome"
      : "Goodbye";

    await db.set(
      `${Current === "Welcome" ? `WC` : `GC`}-${message.guild.id}`,
      mentionedChannel.id
    );

    return message.channel.send({
      embeds: [
        {
          color: Color || "RANDOM",
          title: "<a:star:935134992089108490>Success mengatur channel",
          description: `${Current} Channel Has Been Set - <#${mentionedChannel.id}>`,
          footer: { text: `- ${message.author.username}` },
          timestamp: new Date(),
        },
      ],
    });
  },
};
