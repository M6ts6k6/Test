var fs = require("fs"),
getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports.run = (client, message, args) => {
    if(!message.guild) return;
    var config = require("../../config.json"),
    db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
var emotes = require("../../emotes.json")
var config = require("../../config.json")
let authorized = [`${config.bot.owner}`, `${config.bot.owner1}`, `${config.bot.owner2}`, `${config.bot.owner3}`, `${config.bot.owner4}`, `${config.bot.owner5}`, `${config.bot.owner6}`, `${config.bot.owner7}`, `${config.bot.owner8}`, `${config.bot.owner9}`, `${config.bot.owner10}`]
if(!authorized.includes(message.author.id)) return message.channel.send(`${emotes.general.no} ERREUR: Vous devez être \`OWNER\` du bot pour éxecuter cette commande.`);

       if (args.length) {
        let str_content = args.join(" ")
client.user.setPresence({ activity: { name: str_content, type: "LISTENING" }, status: 'idle' })
.then(p => message.channel.send(`${message.author}, Mise à jour du statut de votre bot en \`${str_content}\``))
.catch(e => { message.channel.send(`${message.author}, Une erreur est survenue. \n \`Plus d'informations:\` \`🔻\` \`\`\`${e}\`\`\``); });

} else {
        message.channel.send(`${message.author}, Vous avez fournie aucune valeur`);
    }
};
module.exports.help = {
    name: "listen",
    aliases: [],
    category: 'Administration',
    description: "Permet de changer le statut du Bot",
  };