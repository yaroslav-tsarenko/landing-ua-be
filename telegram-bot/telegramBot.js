const TelegramBot = require('node-telegram-bot-api');

const token = '7660792239:AAGBrFI7dI3B9C3WmDr1BoEfHSX-QJuF-H4';

console.log('Bot starting...');

const bot = new TelegramBot(token, { polling: true });

const publicChannelUsername = '@lvlxnotifications';

bot.on('message', (msg) => {
    console.log('Received message:', msg);
    if (msg.chat && msg.chat.type === 'channel') {
        console.log('Channel ID:', msg.chat.id);
    }
});

const sendMessageToChannel = (message) => {
    bot.sendMessage(publicChannelUsername, message)
        .then(() => console.log('Message sent to channel.'))
        .catch((error) => console.error('Error sending message to channel:', error));
};

console.log('Bot started successfully');

module.exports ={
    sendMessageToChannel
}