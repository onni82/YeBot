import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

async function fetchKanyeQuote() {
    try {
        const response = await fetch('https://api.kanye.rest');

        if (!response.ok) {
            throw new Error(`Quote API request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (!data.quote) {
            throw new Error('Quote API returned an invalid payload.');
        }

        return data.quote;
    } catch (error) {
        console.error('Failed to fetch Kanye quote:', error);
        return 'I am Warhol. I am the No. 1 most impactful artist of our generation. I am Shakespeare in the flesh.';
    }
}

function generateKanyeStyleLine(topic) {
    const intros = [
        'Listen,',
        'Real talk,',
        'Let me be clear,',
        'I am not here to play,',
        'This is visionary-level thinking:'
    ];

    const closers = [
        'that is future energy.',
        'that is bigger than culture.',
        'that is next-level creativity.',
        'that is icon behavior.',
        'that is God-level confidence.'
    ];

    const intro = intros[Math.floor(Math.random() * intros.length)];
    const closer = closers[Math.floor(Math.random() * closers.length)];
    return `${intro} ${topic} is not a trend, ${closer}`;
}

client.on(Events.ClientReady, readyClient =>{
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'kanye') {
        const quote = await fetchKanyeQuote();
        await interaction.reply(`"${quote}"\n- Kanye West`);
        return;
    }

    if (interaction.commandName === 'kanye_says') {
        const topic = interaction.options.getString('topic', true);
        const line = generateKanyeStyleLine(topic);
        await interaction.reply(`"${line}"\n- Maybe Kanye West`);
    }
});

client.login(process.env.TOKEN);
