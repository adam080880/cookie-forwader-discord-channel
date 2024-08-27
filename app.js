require('dotenv').config()

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

app.get('/', (req, res) => {
  res.send('Ready');
});

app.post('/submit', async (req, res) => {
  const {path, payload} = req.body;

  let channel = client.channels.cache.get(CHANNELID);

  if (!channel) {
    client.channels.fetch(CHANNELID).then((ch) => {
      ch.send(`path: ${path} \n payload: ${payload}`);
    });
  } else {
    channel.send(`path: ${path} \n payload: ${payload}`);
  }

  res.send('OK');
});

app.listen(80, () => {
  console.log('Server is ready');
});

module.exports = app;
