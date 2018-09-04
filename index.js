const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} Loaded!`);
    bot.commands.set(props.help.name, props);
  });

})


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Fienday", {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  //Bot commands down here!

  // if(cmd === `${prefix}ban`){
  //
  //   //!ban @vexera ugly
  //
  //   let bUser = message.mentions.users.first() || message.guild.members.get(args[0]);
  //   if (!bUser) return message.channel.send("Can't find user!");
  //   let bReason = args.slice(1).join(' ');
  //   if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
  //
  //   let banEmbed = new Discord.RichEmbed()
  //   .setDescription("Ban Information")
  //   .setColor("#ed9a0b")
  //   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  //   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Banned In", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", bReason);
  //
  //   let banChannel = message.guild.channels.find(`name`, "logs");
  //   if(!banChannel) return message.channel.send("Can't find the logs channel");
  //
  //   message.guild.member(bUser).ban(bReason);
  //   banChannel.send(banEmbed);
  //
  //   return;
  // } else
  // if(cmd === `${prefix}kick`){
  //
  //   //!kick @vexera ugly
  //
  //   let kUser = message.mentions.users.first() || message.guild.members.get(args[0]);
  //   if (!kUser) return message.channel.send("Can't find user!");
  //   let kReason = args.slice(1).join(' ');
  //   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
  //
  //   let kickEmbed = new Discord.RichEmbed()
  //   .setDescription("Kick Information")
  //   .setColor("#ed9a0b")
  //   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  //   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Kicked In", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", kReason);
  //
  //   let kickChannel = message.guild.channels.find(`name`, "logs");
  //   if(!kickChannel) return message.channels.send("Can't find incidents channel.");
  //
  //   message.guild.member(kUser).kick(kReason);
  //   kickChannel.send(kickEmbed);
  //
  //   return;
  // } else
  // if(cmd === `${prefix}report`){
  //
  //
  //     //!report @fieranz this is reason
  //
  //     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //     if(!rUser) return message.channel.send("Can't find user.");
  //     let reason = args.join(" ").slice(22);
  //
  //     let reportEmbed = new Discord.RichEmbed()
  //     .setDescription("Report Info")
  //     .setColor("#ed9a0b")
  //     .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  //     .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //     .addField("Channel", message.channel)
  //     .addField("Time", message.createdAt)
  //     .addField("Reason", reason);
  //
  //     let reportschannel = message.guild.channels.find(`name`, "reports");
  //     if(!reportschannel) return message.channel.send("Can't find reports channel");
  //
  //     message.delete().catch(O_o=>{});
  //     reportschannel.send(reportEmbed);
  //
  //     //message.deleted().catch(O_o=>{});
  //
  //     return;
  // } else
  //
  // if(cmd === `${prefix}serverinfo`){
  //
  //   let sicon = message.guild.iconURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Server Information")
  //   .setColor("#c95f08")
  //   .setThumbnail(sicon)
  //   .addField("Server Name", message.guild.name)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.guild.joinedAt)
  //   .addField("Total Members", message.guild.memberCount);
  //
  //   return message.channel.send(serverembed);
  // }
  //
  //
  // if(cmd === `${prefix}botinfo`){
  //
  //   let bicon = bot.user.displayAvatarURL;
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Bot Information")
  //   .setColor("#c95f08")
  //   .setThumbnail(bicon)
  //   .addField("Bot Name", bot.user.username);
  //
  //   return message.channel.send(botembed);
  // }

});

bot.login(botconfig.token);
