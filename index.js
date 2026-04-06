import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { readFile } from 'node:fs/promises';

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

async function loadJsonArray(fileUrl, label) {
    const rawContents = await readFile(fileUrl, 'utf8');
    const parsedContents = JSON.parse(rawContents);

    if (!Array.isArray(parsedContents) || parsedContents.length === 0) {
        throw new Error(`${label} file must contain a non-empty JSON array.`);
    }

    return parsedContents;
}

const [kanyeIntros, kanyeClosers, kanyeMiddles] = await Promise.all([
    loadJsonArray(new URL('./data/kanye-intros.json', import.meta.url), 'Intros'),
    loadJsonArray(new URL('./data/kanye-closers.json', import.meta.url), 'Closers'),
    loadJsonArray(new URL('./data/kanye-middles.json', import.meta.url), 'Middles')
]);

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

function pickRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function generateKanyeStyleLine(topic) {
    const intro = pickRandomItem(kanyeIntros);
    const middle = pickRandomItem(kanyeMiddles);
    const closer = pickRandomItem(kanyeClosers);
    return `${intro} ${topic} ${middle}, ${closer}`;
}

client.on(Events.ClientReady, readyClient =>{
    console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'kanye') {
        const quote = await fetchKanyeQuote();
        await interaction.reply(`"${quote}"\n- Kanye`);
        return;
    }

    if (interaction.commandName === 'kanye_says') {
        const topic = interaction.options.getString('topic', true);
        const line = generateKanyeStyleLine(topic);
        await interaction.reply(`"${line}"\n- Something Kanye could have said`);
    }
});

client.login(process.env.TOKEN);
