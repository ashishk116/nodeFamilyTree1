const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const cookieParser= require('cookie-parser')
const cors=require('cors')
const authRoutes=require("./routes/auth")



mongoose.connect(process.env.DATABASE, 
{
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(()=>{console.log('DB CONNECTED')})


const port = process.env.PORT || 3000


const admin =(req,res) =>{
  res.send('Admin routeASh')
}

app.get('/admin',admin);

app.get('/', (req, res) => {
  res.send('Hello WordAS!')
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//myroutes
app.use('/api',authRoutes);

app.listen(port, () => {
  console.log(`Server is up an running ${port} `)
})
