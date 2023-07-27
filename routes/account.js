import { Router } from "express";
import userModel from "../schema/user-model.js";
import { USERS_BBDD } from "../json-example/bbdd.js";

const accountRouter = Router()

//middleware that logs the IP
accountRouter.use((req, res, next) => {
    console.log(req.ip);
  
    next();
}); 

//get users details
accountRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOne({email}).exec();
  
    if (!user) return res.status(404).send();
  
    return res.send(user);
});


//add user details
accountRouter.post("/", async (req, res) => {
    const {email, firstname, lastname, dateofbirth, phone  } = req.body;
 
 
    const newUser = new userModel({ firstname, lastname, email, dateofbirth, phone});
 
    const userEmail = await userModel.findMany({email, phone}).exec();
    const userPhone = await userModel.findOne({phone}).exec(); 

    if(userEmail)
        return res.status(409).send("Este email ya esta registrado, por favor utilice otro correo electronico.");

    if(userPhone)   
        return res.status(409).send("Este teléfono ya esta siendo usado, por favor utilice otro numero telefónico.");
   
    await newUser.save();
    
    if (newUser)
     return res.status(200).send("Se registro el usuario de manera exitosa!!")
   
    

});

//Update users details
accountRouter.patch("/", async (req, res) => {
  const { email } = req.params;
  const { firstname, lastname } = req.body;

  if (!firstname || !lastname) return res.status(400).send();
  const user = await userModel.findOneAndUpdate({email});

  user.firstname = firstname;
  user.lastname = lastname;

  await user.save(); 

  return res.send();
 
}); 

//Delete users
accountRouter.delete("/", async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOne(email).exec();
  
    if (!user) return res.status(404).send();
  
    user.remove()
  
    return res.send();
  
  });
  
  export default accountRouter;