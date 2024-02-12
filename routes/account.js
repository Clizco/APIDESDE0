import { Router, json, response } from "express";
import userModel from "../schema/user-model.js";
import { validateCreate } from '../validators/users.js' 
import { validateUpdate } from "../validators/update.js";
import { validateToken } from "../validators/validateToken.js";
import jwt from "jsonwebtoken"
import { jwtDecode } from "jwt-decode";
import config from "../config.js";


const accountRouter = Router()

//middleware that logs the IP
accountRouter.use((req, res, next) => {
    console.log(req.ip);
  
    next();
}); 


//get users details
accountRouter.get("/:email", async (req, res) => {
    const { email } = req.params ;
    const user = await userModel.findOne({email}).exec();
  
    if (!user) return res.status(404).send("");
  
    return res.send(user);
});

//get all users details
accountRouter.get("/users/all", async (req, res) => {
    const user = await userModel.find({}, {password: 0}).exec();
  
    return res.status(200).json(user)
}) 

// Validate Token
accountRouter.get("/users/token", async (req, res) => {

    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        }) 
    }
    
  
    const decoded = jwt.verify(token, config.secret);
    const user = await userModel.findById(decoded.id, {password: 0})
    if(!user) {
        return res.status(404).send('No user found')
    }

    res.json(user)
})


//add user details
accountRouter.post("/signup/", validateCreate, async (req, res) => {
    const {email, firstname, lastname, password, dateofbirth, phone  } = req.body;
 
 
    const newUser = new userModel({ firstname, lastname, email, password,  dateofbirth, phone});
    
    const userEmail = await userModel.findOne({email}).exec();
    const userPhone = await userModel.findOne({phone}).exec(); 
    newUser.password = await newUser.encryptPassword(newUser.password);
    const token = jwt.sign({id: newUser._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    })
    
    if (!dateofbirth) {
        res.status(409).send({
            error: "Thats not a date.",
        })
     return
    }
    if(userEmail){
        res.status(409).send({
            error: "Email is already registered",
        })
     return
    }
    if(userPhone){
        res.status(409).send({
            error: "Phone is already registered"
        })
    return
    }
      
        res.json({auth: true, token})
    await newUser.save();

}); 

//signing user details
accountRouter.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email: email}); 
    if (!user) {
        return res.status(404).send("The email doesn't exists")
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword) {
        return res.status(401).json({auth: false, token: null})

    }
    
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({auth: true,
              token: token,
              message: 'Enjoy your token', 
            })

    var decode = jwtDecode(token)
    console.log(decode)
  
})

//update users details
accountRouter.patch('/update/:id', validateUpdate, async (req, res) => {
    const id  = req.params.id; 
    const newUserData  = req.body; 	
    const user = await userModel.findOneAndUpdate({ _id: id }, {$set: newUserData});

    if (!user) 
        return res.status(404).send("No se encuentra al usuario :(");
    if(user)
        return res.status(200).send("El usuario se actualizo correctamente")

 }); 

//update user information
accountRouter.post("/updateUser", async (req, res)=> {
    const { id, firstname, lastname } = req.body;
    try {
        await userModel.updateOne({ _id: id }, {
            $set: {
                firstname: firstname,
                lastname: lastname
            }
        })
        return res.json({ status: "ok", data: "updated"})
    }catch (error) {
        return res.json({ status: "error", data: error })
    }

})  

//delete users
accountRouter.delete("/delete", async (req, res) => {
    const { email } = req.body;
    try {
        await userModel.findOneAndDelete({ email: email})
        return res.status(200).send('El usuario se elimino correctamente')
   }catch (error) {
        return res.status(404).send('El usuario no se a podido eliminar, o no se a encontrado')
   }
   

});

//Delete user data
accountRouter.post("/deleteUser", async(req, res)=> {
    const {userid} = req.body
    try {
        await userModel.deleteOne({_id: userid}, {
            });
        res.send({ status: "Ok", data: "Deleted"});
    }catch (error) {
        console.log(error)
    }
})
  
  export default accountRouter;

  