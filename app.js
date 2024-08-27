require('dotenv').config()

const express = require('express');
const cors = require('cors');
const discord = require('discord.js');
const bodyParser = require('body-parser');
const app = express();

const TOKEN = process.env.DISCORD_TOKEN;
const CHANNELID = process.env.DISCORD_CHANNEL_ID;
console.log(TOKEN, CHANNELID);

const client = new discord.Client({intents: ["Guilds", "GuildMessages"]});
client.login(TOKEN);

client.on('ready', () => {
  console.log('bot is ready');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Ready');
});

app.post('/submit', async (req, res) => {
  const {path, payload} = req.body;

  const channel = await client.channels.fetch(CHANNELID);
  
  if (channel) {
    channel.send(`path: ${path}`);
    channel.send(`payload: ${payload}`);
  }

  res.send('OK');
});

app.listen(80, () => {
  console.log('Server is ready');
});

module.exports = app;
