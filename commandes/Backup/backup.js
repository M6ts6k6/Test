const { MessageEmbed } = require("discord.js");
const backup = require("discord-backup");
const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const fs = require("fs");
emojis = require("./../../emotes.json"),
module.exports.run = async (client, message, args) => {
    if(!message.guild) return;
    let db = JSON.parse(fs.readFileSync(`./serveur/${message.guild.id}.json`, "utf8"));
    let config = require("./../../config.json")
    let authorized = [`${config.bot.owner}`, `${config.owner}`, `${config.owner2}`, `${config.owner3}`]
    
    if(args[0] === "create"){
        if(!authorized.includes(message.author.id)) return message.lineReply(`Désolé, mais vous n'êtes pas owner du bot.`);
        backup.create(message.guild, {
            maxMessagesPerChannel: 0,
            jsonBeautify: true
        }).then((backupData) => {
            message.channel.send(`Backup correctement créer, faites \`${db.prefix}backup load ${backupData.id}\` pour charger la backup`);
        });
    }

    if(args[0] === "load"){
        // Check member permissions
        if(!authorized.includes(message.author.id)) return message.lineReply(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);

        let backupID = args[1];
        if(!backupID){
            return message.channel.send(`Vous devez spécifier une ID de backup valide !`);
        }
        // Fetching the backup to know if it exists
        backup.fetch(backupID).then(async () => {
            // If the backup exists, request for confirmation
            message.channel.send(`Quand la backup est chargé, tout les channels, rôles, etc. Vont être remplacé ! Tapez \`${db.prefix}confirmer\` pour confirmer`);
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === `${db.prefix}confirmer`), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(`Plus de temps ! Chargement annulé`);
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(`Chargement de la backup`);
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                }).catch((err) => {
                    return message.author.send(`Désolé, une erreur est survenue, veuillez vérifier si je possède les permissions d'administrateur`);
                });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(`Aucun résultat pour la backup \`"+backupID+"\``);
        });
    }

    if (args[0] == "list") {
        if(!authorized.includes(message.author.id)) return message.lineReply(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
        backup.list().then((backups) => {
            const list = new MessageEmbed()
            .setAuthor('📰 Liste des backups')
            .setDescription(`\`\`\`${backups}\`\`\` `)
            .setColor(db.color)

            message.channel.send(list);
        });
    }
    
    if (args[0] == "remove") {
        if(!authorized.includes(message.author.id)) return message.lineReply(`Désolé, mais vous n'avez pas la permission requise pour executer cette commande.`);
        if (!args[1]) {
            message.channel.send(`Veuillez spécifier l'ID de la backup que vous voulez supprimer`)
        }
        backup.remove(args[1])
        message.channel.send(`La backup ${args[1]} a été supprimé avec succès`);
    }

}

module.exports.help = {
    name: "backup",
    category: 'backup',
    description: ".",
    aliases: ['bakup'],

  };