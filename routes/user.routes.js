import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller";
import { get } from "http";

 const userRouter = Router();
  
 userRouter.get('/', getUsers);
   // Handle fetching user details;



 userRouter.get('/:id', getUser);
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