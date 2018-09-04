const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!wUser) return message.reply("Couldn't find them.");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("I can't do that.");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warning Information")
    .setAuthor(message.author.username)
    .setColor("#ed9a0b")
    .addField("Warned User", wUser.tag)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "logs");
    if(!warnchannel) return message.reply("Couldn't find logs channel.");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(`name`, "Muted");
      if(!muterole) return message.reply("You should create Muted role first.")

      let mutetime = "10s";
      await(wUser.addRole(muterole.id));
      message.channel.send(`${wUser.tag} has been temporarily muted`);

      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.channel.reply(`They have been unmuted`)
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
      message.guild.member(wUser).ban(reason);
      message.channel.send(`${wUser.tag} has been banned from the server!`)
    }
}

module.exports.help = {
  name: "warn"
}
