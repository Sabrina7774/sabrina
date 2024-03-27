const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Используем директорию "public" для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register', (req, res) => {
    const { name, password, userType } = req.body;

    if (!name || !password || !userType) {
        return res.status(400).send('All fields are required.');
    }

    const userData = `${name}, ${password}, ${userType}\n`;

    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data.');
        }
        console.log('Data saved to file');
        res.send('Registration successful!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});