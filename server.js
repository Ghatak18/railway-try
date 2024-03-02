const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors =  require("cors");
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const jwt = require('jsonwebtoken');
var http = require('http');
var Cookies = require('cookies');
dotenv.config();
const auth = require("./middlewires/auth");
const cP = require("cookie-parser");

const port = 3000 ;


mongoose.connect(process.env.MOB_CONNECT)
.then(console.log("Its Happening"))
.catch((error) =>{
    console.log(error);
});


const hom1 = require('./models/models');
const hom2 = require('./models/hom2');
const users = require('./models/userModels');

app.use(express.json());
// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(cP());


app.get('/', function (req, res) {
  hom2.find({}).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err)
  })
})




app.post('/register1', async(req,res) => {
    try{

       
    const{ email1, pass, confirmPass} = req.body;
    

    if(!email1 || !pass || !confirmPass){
        res.json({
            "message":"fuck you"
        });
    }
    if(pass.length <= 4){
        res.json({
            "message":"please enter a pass word atleast 5 digits long "
        });

    };
    if(pass !== confirmPass){
        res.json({
            "message":"please cofirm the passwords correctly"
        })
        console.log("please cofirm the passwords correctly");
    };
    
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass,salt);

    console.log(hash);
    const user1 = await users.findOne({email: email1})
   
    if(user1){
        res.json({
                    "message":"You are registered already"
                        });

    }
    else{
    const user = await users.create({
         email: email1 ,
         pass: hash
    });

    const token = jwt.sign({
        user: user.email,
},"Supratik@18");
    console.log(token);

    res.cookie("token",token,{
        httpOnly: true
    }).send();

    res.json(user);
}


    
} catch(error){
    console.log(error.message);

}
    
})

app.post("/login", async(req,res)=>{
    try{
    const{email2,pass} = req.body;

    if(!email2 || !pass){
        res.json({"message" : "Please enter all the fields"});
    }

    const user2 = await users.findOne({email:email2});
    // await user.findOne({ country: 'Croatia' })
    
    if(!user2){
        res.json({"message" : "Wrong Email or Password"});
    }

    const iscorrect =await bcrypt.compare(pass,user2.pass);

    if(!iscorrect){
        res.json({"message" : "Wrong Email or Password11"});
    }


    const token = jwt.sign({
        user: user2.email
    },"Supratik@18");
    console.log(token);

    res.cookie("token", token, {
        httpOnly: true
    }).send();

    res.json(user2);


    } catch(error){
        console.log(error.message);
    }


})

app.get('/logout', async(req,res) =>{
try{

    res.cookie("token", "",{
        httpOnly : true,
        expires : new Date(0) 
    }).send();


} catch(error){
    console.log(error.message);
}
}
)

app.get('/isres', auth, async(req,res) => {
    try{
        console.log(req.user); 

        const user1 = await hom2.findOne({email: req.user});
   
    if(user1){
        // res.json({
        //     "message":"Y"
        // })
        res.send("Y");

    }
    else{
        // res.json({
        //     "message":"N"
        // })
        res.send("N");

    } 
}catch(error){
        console.log(error.message);
    }
})


app.post('/add',auth,  async(req,res) =>{
    try{
        const{name, desc, img} = req.body;
    //     const user1 = await users.create({
    //         email: email1 ,
    //         pass: hash
    //    });

        const user = await hom2.create({
            email: req.user,
            name: name,
            desc: desc,
            img: img

        });
        res.status(200).json(user);

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})




app.listen(port);

