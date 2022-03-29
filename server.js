const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const authRouter = require('./routes/authroutes');
const cors = require('cors')

const urlmodel = require('./models/urls')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true

});
mongoose.connection.on('connected',()=>{
console.log('system connceted to  database');
});
app.use(cors())
app.use(express.json());
app.use('/api/',authRouter);



app.get('/:short',(req,res) => {

    const short = req.params.short;
    
    urlmodel.findOne({short: short},(err,data) => {
        if(err) {
            res.status(500).json({error: "can not get link"})
        }
        else{
            data.clicks++;
            data.save();
            res.redirect(data.full)
        }
    })
    

});

app.use((req,res,next) => {
    res.status(404).json({
        success: false,
        message: 'Page not Fount'
    })
})
app.listen(PORT,() => {
    console.log(`server live on ${PORT}`)
})

