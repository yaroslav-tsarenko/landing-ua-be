const axios = require('axios');
const Lead = require('../models/lead.model');
const {sendMessageToChannel} = require("../telegram-bot/telegramBot");

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
        const totalLeads = await Lead.countDocuments();
        const leadNumber = `#${String(totalLeads + 1).padStart(4, '0')}`;
        const leadName = `Лід із форми LandingUA | ${leadNumber}`;

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

        const newLead = new Lead({
            username,
            phone,
            email,
            ip,
            utm_source,
            utm_medium,
            utm_campaign,
            userAgent,
            device,
            leadNumber
        });

        await newLead.save();

        res.status(200).send('✅ Лід успішно створено та збережено');
    } catch (error) {
        console.error("❌ Помилка при відправці в Kommo або збереженні:", JSON.stringify(error?.response?.data || error.message, null, 2));
        res.status(500).send('❌ Помилка створення ліда');
    }
};

const submitForm = (req, res) => {
    const formData = req.body;

    console.log('Form Data Received:', formData);
    console.log('Company Name:', formData.companyName || 'N/A');
    console.log('Email:', formData.email || 'N/A');
    console.log('Phone:', formData.phone || 'N/A');
    console.log('Telegram:', formData.telegram || 'N/A');
    console.log('Password:', formData.password || 'N/A');

    const message = `🎉 Новая регистрация с вебсайта! 🎉\n\n` +
        `🏢 Компания: ${formData.companyName || 'N/A'}\n` +
        `📧 Емейл: ${formData.email || 'N/A'}\n` +
        `📞 Телефон: ${formData.phone || 'N/A'}\n` +
        `💬 Телеграм: ${formData.telegram || 'N/A'}\n` +
        `🔒 Пароль: ${formData.password || 'N/A'}`;

    sendMessageToChannel(message);

    res.status(200).json({
        message: 'Form submitted successfully!',
        data: formData,
    });
};


module.exports = { sendMessageToKommo, submitForm };
