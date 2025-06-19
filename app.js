const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello, world!'));
app.get('/api/data', (req, res) => res.json({ value: 42 }));

app.listen(port, () => console.log(`Listening on port ${port}`));
