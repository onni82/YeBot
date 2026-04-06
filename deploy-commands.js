import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const commands = [
    {
        name: 'kanye',
        description: 'Get a random Kanye quote.',
    },
    {
        name: 'kanye_says',
        description: 'Ask Kanye to respond to your topic.',
        options: [
            {
                name: 'topic',
                description: 'What should Kanye talk about?',
                type: 3,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
