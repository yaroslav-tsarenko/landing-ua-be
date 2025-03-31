const axios = require('axios');

const sendMessageToKommo = async (req, res) => {
    const { username, text, phone, nickname } = req.body;

    try {
        await axios.post(`https://tresortech.kommo.com/api/v4/leads`, [
            {
                name: `${text} ${username} (${nickname}) з телефоном ${phone}, ID в Telegram: ${userId}`,
                contacts: [
                    {
                        first_name: username,
                        custom_fields_values: [
                            { field_name: "Повідомлення", values: [{ value: text }] }
                        ]
                    }
                ]
            }
        ], {
            headers: {
                Authorization: `Bearer ${process.env.KOMMO_AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error("❌ Помилка при відправці в Kommo:", error);
        res.status(500).send('Error sending message');
    }
};

module.exports = {
    sendMessageToKommo
}