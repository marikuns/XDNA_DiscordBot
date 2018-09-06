const Discord = require('discord.js');
const http = require('https');
// Create an instance of a Discord client
const client = new Discord.Client();
///https://www.cryptopia.co.nz/api/GetMarket/XDNA_BTC
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content === '/price') {
        // Send "pong" to the same channel
        getCPData((data) => {
            var info = JSON.parse(data);
            message.channel.send('Ask: ' + info.Data.AskPrice )
            message.channel.send('RAW \r\n`' + data+'`' )
            
            client.user.setPresence({ game: { name: 'Ask: ' + info.Data.AskPrice }, status: 'idle' })
                .then(console.log)
                .catch(console.error);
        });
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NDg3MzM1MjY1MzU5MTAxOTU0.DnMM4A.B8_DDeubxPTXd_VgH1yIov2xLrQ');
async function getCPData(callback) {
    var data = http.get('https://www.cryptopia.co.nz/api/GetMarket/XDNA_BTC', (req) => {
        req.on('data', (res) => {
            callback(res.toString())
        });
    });

}