const axios = require('axios');
const fs = require('fs');
const path = require('path');

const counterFilePath = path.join(__dirname, 'leadCounter.json');

function getNextLeadNumber() {
    let current = 0;

    try {
        if (fs.existsSync(counterFilePath)) {
            const data = fs.readFileSync(counterFilePath, 'utf8');
            current = JSON.parse(data).last || 0;
        }
    } catch (err) {
        console.error("Помилка читання лічильника:", err);
    }

    const next = current + 1;

    try {
        fs.writeFileSync(counterFilePath, JSON.stringify({ last: next }), 'utf8');
    } catch (err) {
        console.error("Помилка запису лічильника:", err);
    }

    return `#${String(next).padStart(4, '0')}`;
}

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

    const leadNumber = getNextLeadNumber();
    const leadName = `${leadNumber} | Лід із форми LandingUA`;

    try {
        await axios.post('https://tresortech.kommo.com/api/v4/leads', [
            {
                name: leadName,
                pipeline_id: 10647283,
                custom_fields_values: [
                    { field_id: 1051004, values: [{ value: username }] },
                    { field_id: 1051006, values: [{ value: phone }] },
                    { field_id: 1051008, values: [{ value: email }] },
                    { field_id: 1051012, values: [{ value: ip }] },
                    { field_id: 1051014, values: [{ value: utm_source }] },
                    { field_id: 1051016, values: [{ value: utm_medium }] },
                    { field_id: 1051018, values: [{ value: utm_campaign }] },
                    { field_id: 1051020, values: [{ value: userAgent }] },
                    { field_id: 1051022, values: [{ value: device }] }
                ]
            }
        ], {
            headers: {
                Authorization: `Bearer ${process.env.KOMMO_AUTH_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        res.status(200).send('✅ Лід успішно створено');
    } catch (error) {
        console.error("❌ Помилка при відправці в Kommo:", JSON.stringify(error?.response?.data, null, 2));
        res.status(500).send('❌ Помилка створення ліда');
    }
};

module.exports = { sendMessageToKommo };
