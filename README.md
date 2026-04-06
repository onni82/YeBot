# YeBot Setup

This project is a Kanye-themed Discord slash-command bot.

Available commands:

- `/kanye` -> Sends a random Kanye quote from the Kanye REST API.
- `/kanye_says topic:<text>` -> Sends a Kanye-style one-liner about your topic.

This bot requires a `.env` file in the project root with the following values:

```env
TOKEN=your_discord_bot_token_here
CLIENT_ID=your_application_client_id_here
```

You can start from `.env.example`, add your values, and then rename it to `.env`.

## 1. Install dependencies

```bash
npm install
```

## 2. Prepare environment variables

1. Open `.env.example`.
2. Add your bot token and client ID.
3. Rename `.env.example` to `.env`.

## 3. Create the Discord application and bot

1. Open the Discord Developer Portal: <https://discord.com/developers/applications>
2. Click **New Application**.
3. Enter an app name and create it.
4. Open your app and go to **Bot** in the left sidebar.
5. Click **Add Bot** (if needed).
6. Under **Token**, click **Reset Token** or **Copy** and paste it as `TOKEN` in `.env`.
7. Go to **General Information** and copy the **Application ID**. Paste it as `CLIENT_ID` in `.env`.

## 4. Configure bot settings (recommended)

In **Bot** settings:

1. Enable the intents your bot needs (for many bots, at least `MESSAGE CONTENT INTENT` is needed).
2. Save changes.

## 5. Invite the bot to your server

1. In the Developer Portal, open **OAuth2** -> **URL Generator**.
2. Select scope: `bot` (and `applications.commands` if your bot uses slash commands).
3. Select required bot permissions.
4. Copy the generated URL, open it in your browser, and invite the bot to your server.

## 6. Register commands

```bash
node deploy-commands.js
```

## 7. Run the bot

```bash
node index.js
```

If the token and client ID are correct, your bot should log in successfully.

## Example usage

- `/kanye`
- `/kanye_says topic:my new album`
