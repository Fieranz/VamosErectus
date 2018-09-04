const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.mentions.users.first() || message.guild.members.get(args[0]);
    if (!kUser) return message.channel.send("Can't find user!");
    let kReason = args.slice(1).join(' ');
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick Information")
    .setColor("#ed9a0b")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.channels.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
  name : "kick"
}
