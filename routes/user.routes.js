import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import { get } from "http";
import authorize from "../middlewares/auth.middleware.js";

 const userRouter = Router();
  
 userRouter.get('/', getUsers);
   // Handle fetching user details;



 userRouter.get('/:id',authorize, getUser);
   // Handle fetching user details


 userRouter.post('/', (req, res) => {
   // Handle fetching user details
   res.send({ body: { title: ' Create new User' } });
 });


 userRouter.put('/:id', (req, res) => {
   // Handle fetching user details
   res.send({ body: { title: 'Update User Details' } });
 });

 
 userRouter.delete('/:id', (req, res) => {
   // Handle fetching user details
   res.send({ body: { title: 'Delete User Details' } });
 });

 export default userRouter;