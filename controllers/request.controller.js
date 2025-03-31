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
                name: "Лід із форми LandingUA",
                custom_fields_values: [
                    { field_id: 1051004, values: [{ value: username }] },
                    { field_id: 1051006, values: [{ value: phone }] },
                    { field_id: 1051008, values: [{ value: email }] },
                    { field_id: 1051012, values: [{ value: ip }] },
                    { field_id: 1051014, values: [{ value: utm_source }] },
                    { field_id: 1051016, values: [{ value: utm_medium }] },
                    { field_id: 1051018, values: [{ value: utm_campaign }] },
                    { field_id: 1051022, values: [{ value: device }] },
                    { field_id: 1051020, values: [{ value: userAgent }] }
                ],
                _embedded: {
                    contacts: [
                        {
                            first_name: username,
                            custom_fields_values: [
                                { field_id: 1051006, values: [{ value: phone }] },
                                { field_id: 1051008, values: [{ value: email }] }
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
        console.error("❌ Помилка при відправці в Kommo:", error?.response?.data || error.message);
        res.status(500).send('Error sending message');
    }
};

module.exports = { sendMessageToKommo };
