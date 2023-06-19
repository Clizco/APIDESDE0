import { Router } from "express";
import userModel from "../schema/user-schema.js";
import { USERS_BBDD } from "../bbdd.js";

const accountRouter = Router()

//Midleware loguea la direccion ip
accountRouter.use((req, res, next) => {
    console.log(req.ip);
  
    next();
}); 

//Obtener detalles a partir del numero de telefono
accountRouter.get("/:guid", async (req, res) => {
    const { guid } = req.params;
    const user = await userModel.findById(guid).exec();
  
    if (!user) return res.status(404).send();
  
    return res.send(user);
});


//Agregar detalles de los usuarios
accountRouter.post("/", async (req, res) => {
    const { guid, firstname, phone } = req.body;

    if (!guid || !firstname ) return res.state(400).send();

    const user = await userModel.findById(guid).exec();
    if(user)
        return res.status(409).send("El usuario ya esta registrado, por favor inicia sesion o crea un perfil");

    const newUser = new userModel({_id:guid, firstname, phone});
    await newUser.save();
    USERS_BBDD.push({
        guid,
        firstname,
        phone,
    })

});

//Actualizar detalles de los usuarios
accountRouter.patch("/", async (req, res) => {

});

//Eliminar usuarios
accountRouter.delete("/", async (req, res) => {

});

export default accountRouter;