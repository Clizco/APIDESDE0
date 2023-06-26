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
accountRouter.get("/:guid", async (req, res) => {
    const { guid } = req.params;
    const user = await userModel.findById(guid).exec();
  
    if (!user) return res.status(404).send();
  
    return res.send(user);
});


//add user details
accountRouter.post("/", async (req, res) => {
    const { guid, email, firstname, lastname, born, phone  } = req.body;

    if (!guid  || !email ) return res.status(400).send();
 
    const user = await userModel.findById(guid).exec();
    if(user)
        return res.status(409).send("El usuario ya esta registrado, por favor inicia sesion o crea un perfil");

    const newUser = new userModel({_id:guid, firstname, email, born, phone});

   
    await newUser.save();
    USERS_BBDD.push({
        guid,
        firstname,
        lastname,
        email,
        born,
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
    const { guid } = req.params;
    const user = await userModel.findById(guid).exec();
  
    if (!user) return res.status(404).send();
  
    user.remove()
  
    return res.send();
  
  });
  
  export default accountRouter;