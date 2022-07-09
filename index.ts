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

    const guildId = ''; // colocar o id da guilda
    const guild = client.guilds.cache.get(guildId);
    let commands;

    if (guild){
        commands = guild.commands;
    } else {
        commands = client.application?.commands;
    }

    commands?.create({
        name: 'role-um-dado',
        description: 'Rola um dado de usa preferência.',
        options: [
            {
                name: 'Lados',
                description: 'Quantidade de lados do seu dado.',
                required: true,
                type: discordjs.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    });

    commands?.create({
        name: 'role-dois-dados',
        description:'Rola dois dados de sua preferência.',
        options: [
            {
                name: 'ladosPrimeiroDado',
                description:'Quantidade de lados do primeiro dado.',
                required: true,
                type: discordjs.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'ladosSegundoDado',
                description:'Quantidade de lados do segundo dado.',
                required: true,
                type: discordjs.Constants.ApplicationCommandOptionTypes.NUMBER
            }
            
        ]
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

    if (commandName === 'role-um-dado'){
        const faces = options.getNumber('lado') || 6;
        const result = getRandomInt(1, faces);
        
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

    if (commandName === 'role-dois-dados'){
        const maxFirstDie = options.getNumber('ladosPrimeiroDado') || 6;
        const maxSecondDie = options.getNumber('ladosSegundoDado') || 6;
        const firstDie = getRandomInt(1, maxFirstDie);
        const secondDie = getRandomInt(1, maxSecondDie);
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


client.login(process.env.TOKEN); // colocar o id do bot
