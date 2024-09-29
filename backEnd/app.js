const express = require('express');
const app = express();

app.use(express.json());
const PORT = 8181;

app.get('/', (req, res) => {
    res.send('Hello World!');   
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})