import { Router } from "express";
import userModel from "../schema/user-schema.js";
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
    const user = await userModel.findOne(email).exec();
  
    if (!user) return res.status(404).send();
  
    return res.send(user);
});


//add user details
accountRouter.post("/", async (req, res) => {
    const {email, firstname, lastname, DateOfBirth, phone  } = req.body;

 
    const newUser = new userModel({ firstname, lastname, email, DateOfBirth, phone});

    const user = await userModel.findOne({email}).exec();
    if(user)
        return res.status(409).send("El email ya esta registrado, usa otro!!");

   
    await newUser.save();
    USERS_BBDD.push({
        firstname,
        lastname,
        email,
        DateOfBirth,
        phone,
    })
    if (newUser)
     return res.status(200).send("Se registro el usuario de manera exitosa!!")
   
    

});

//Update users details
accountRouter.patch("/", async (req, res) => {
  const { guid } = req.params;
  const { firstname } = req.body;

  if (!firstname) return res.state(400).send();

  const user = await userModel.findById(guid).exec();

  if (!user) res.status(404).send();

  user.firstname = firstname;

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