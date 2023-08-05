import { Router } from "express";
import userModel from "../schema/user-model.js";
import { validateCreate } from '../validators/users.js' 
import { validateUpdate } from "../validators/update.js";

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


//add user details
accountRouter.post("/register/", validateCreate, async (req, res) => {
    const {email, firstname, lastname, dateofbirth, phone  } = req.body;
 
 
    const newUser = new userModel({ firstname, lastname, email, dateofbirth, phone});
    
    const userEmail = await userModel.findOne({email}).exec();
    const userPhone = await userModel.findOne({phone}).exec(); 
   
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
    res.send({

    });

    
        
    await newUser.save();
    
    

});

//Update users details
accountRouter.patch('/update/:id', validateUpdate, async (req, res) => {
    const id  = req.params.id; 
    const newUserData  = req.body; 	
    const user = await userModel.findOneAndUpdate({ _id: id }, {$set: newUserData});

    if (!user) 
        return res.status(404).send("No se encuentra al usuario :(");
    if(user)
        return res.status(200).send("El usuario se actualizo correctamente")

  });

//Delete users
accountRouter.delete("/delete/:email", async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOneAndDelete(email).exec();
  
    if (!user) return res.status(404).send();
  
    return res.status(200).send('El usuario fue eliminado correctamente');
  
  });
  
  export default accountRouter;