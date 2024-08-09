const bodyParser = require('body-parser');
const express = require('express');
const connectDB = require('./src/database/DBconnection');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/api/v1/client', require('./router/client.router'));
app.use('/api/v1/admin', require('./router/admin.router'));

connectDB.connection();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        error: false,
        data:{
            version: "1.0.0",
        },
        message: "Welcome to Anganwaadi API's"
    });
});

app.all("*",(req,res)=>{
    res.status(404).json({
        status:'failure',
        error:true,
        message:"page not found/ api does'nt exist 😒."
    });
});

if(process.env.SERVER === 'development') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;