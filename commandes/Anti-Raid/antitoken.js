const db = require("quick.db")
const fs = require("fs");
const Discord = require('discord.js')




emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    let dab = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    let authorized = [`${config.bot.owner}` , `${config.bot.owner2}` , `${config.bot.owner3}` , `${message.guild.ownerID}`]
    if(!authorized.includes(message.author.id))     return message.lineReply(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
    if (!args.length) {
      return message.channel.send(`${emojis.general.warning} Attention, vous avez mal utiliser la commande, \`antitoken <on/off>\``)
    }
  if(args[0] === "on") {
message.lineReply(`Je viens d’activé l'anti-token`)
      db.set("antidc_"+ message.guild.id , true)
  }
  if(args[0] === "off") {
             message.lineReply(`Je viens de désactiver l'anti-token`)
    db.set("antidc_"+ message.guild.id , null)

}

};


module.exports.help = {
    name: "antitoken",
    aliases: ['antidc' ],
    category: 'Administration',
    description: "Avoir quelque info sur le bot",
  };