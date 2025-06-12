import {Router} from "express";
import {getAllUsers, getUserById} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get('/',getAllUsers);

userRouter.post('/',(req,res)=>{
    res.send({title: 'Create User'});
});

userRouter.get('/:id',authorize, getUserById);

userRouter.put('/:id', (req, res) => {
    res.send({title: `Update User with ID ${req.params.id}`});
});

userRouter.delete('/:id', (req, res) => {
    res.send({title: `Delete User with ID ${req.params.id}`});
});



 export default userRouter;