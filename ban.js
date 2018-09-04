const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.mentions.users.first() || message.guild.members.get(args[0]);
    if (!bUser) return message.channel.send("Can't find user!");
    let bReason = args.slice(1).join(' ');
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Information")
    .setColor("#ed9a0b")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let banChannel = message.guild.channels.find(`name`, "logs");
    if(!banChannel) return message.channel.send("Can't find the logs channel");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);
}

module.exports.help = {
  name : "ban"
}
