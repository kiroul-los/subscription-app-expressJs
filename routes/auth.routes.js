import {Router} from "express";

const authRouter =Router();

authRouter.post('sign-up', (req, res) => {
  // Logic for user Registration
    res.send({title:'Register endpoint'});
    });

authRouter.post('sign-in',(req,res)=>{
    // Logic for user login
    res.send({title:'Login endpoint'});
})

authRouter.post('sign-out', (req, res) => {
    // Logic for user logout
    res.send({title: 'Logout endpoint'});
})


export default authRouter;
