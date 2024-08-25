const express = require('express');
const cors = require('cors');
const discord = require('discord.js');
const bodyParser = require('body-parser');
const app = express();

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNELID = process.env.DISCORD_CHANNEL_ID;

const client = new discord.Client({intents: ["Guilds", "GuildMessages"]});
client.login(TOKEN);

client.on('ready', () => {
  console.log('bot is ready');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.post('/submit', (req, res) => {
  const {path, payload} = req.body;

  const channel = client.channels.cache.get(CHANNELID);
  
  if (channel) {
    channel.send(`path: ${path}`);
    channel.send(`payload: ${payload}`);
  }

  res.send('OK');
});

app.listen(3000, () => {
  console.log('Server is ready');
});
