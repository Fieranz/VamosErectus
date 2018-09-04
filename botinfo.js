const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#c95f08")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username);

    return message.channel.send(botembed);
}

module.exports.help = {
  name : "botinfo"
}
