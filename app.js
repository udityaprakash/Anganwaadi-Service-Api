const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use('/api/client/v1', require('./router/client'));
app.use('/api/admin/v1', require('./router/admin'));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        error: false,
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