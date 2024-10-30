const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Sever  is running at http://localhost:${port}`);
});

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith'}
    ]);
});
app.get('/', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith'}
    ]);
});

