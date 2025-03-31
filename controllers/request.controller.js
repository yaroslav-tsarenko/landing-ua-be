const axios = require('axios');

const sendMessageToKommo = async (req, res) => {
    const {
        username,
        phone,
        email,
        ip,
        utm_source,
        utm_medium,
        utm_campaign,
        userAgent,
        device
    } = req.body;

    try {
        await axios.post('https://tresortech.kommo.com/api/v4/leads', [
            {
                name: "Лід із форми",
                custom_fields_values: [
                    { field_name: "Ім’я", values: [{ value: username }] },
                    { field_name: "Телефон", values: [{ value: phone }] },
                    { field_name: "Email", values: [{ value: email }] },
                    { field_name: "IP", values: [{ value: ip }] },
                    { field_name: "UTM Source", values: [{ value: utm_source }] },
                    { field_name: "UTM Medium", values: [{ value: utm_medium }] },
                    { field_name: "UTM Campaign", values: [{ value: utm_campaign }] },
                    { field_name: "User-Agent", values: [{ value: userAgent }] },
                    { field_name: "Пристрiй", values: [{ value: device }] }
                ],
                _embedded: {
                    contacts: [
                        {
                            first_name: username,
                            custom_fields_values: [
                                { field_name: "Телефон", values: [{ value: phone }] },
                                { field_name: "Email", values: [{ value: email }] }
                            ]
                        }
                    ]
                }
            }
        ], {
            headers: {
                Authorization: `Bearer ${process.env.KOMMO_AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        });
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error("❌ Помилка при вiдправцi в Kommo:", error);
        res.status(500).send('Error sending message');
    }
};

module.exports = { sendMessageToKommo };