import discordjs, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new discordjs.Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on('ready', () =>{
    console.log('The bot is ready');

    const guildId = '';
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild){
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'd-6',
        description: 'Rola um dado D6.',
    });

    commands?.create({
        name: 'd-6-Twice',
        description:'Rola dois dados D6.'
    });
});

client.on('interactionCreate',async (interactions) => {
    if(!interactions.isCommand()){
        return;
    }

    const { commandName, options } = interactions;

    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if (commandName === 'd-6'){
        const result = getRandomInt(1, 6);
        
        if (result === 1){
            interactions.reply({
                content: `Resultado: ${result}! FALHA CRÍTICA!`
            });
        } else {
            interactions.reply({
                content: `Resultado: ${result}`
            });
        }
    }

    if (commandName === 'd-6-Twice'){
        const firstDie = getRandomInt(1, 6);
        const secondDie = getRandomInt(1, 6);
        const result = firstDie + secondDie;

        interactions.reply({
            content:`Primeiro dado: ${firstDie}, segundo dado: ${secondDie}. Resultado final: ${result}`
        })
    }
});

client.on('messageCreate', (message) =>{
    if(message.content === "que horas são?"){
        message.reply("É hora da aventura!");
    }
});


client.login(process.env.TOKEN);
