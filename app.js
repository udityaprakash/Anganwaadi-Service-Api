const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        error: false,
        message: "Welcome to Anganwaadi API's"
    });
});

if(process.env.SERVER === 'development') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;