import { Router } from "express";

 const userRouter = Router();
  
 userRouter.get('/', (req, res) => {
   // Handle fetching user details
   res.send({ body: { title: ' GET all User Details' } });
 });



 userRouter.get('/:id', (req, res) => {
   // Handle fetching user details
   res.send({ body: { title: ' GET User Details' } });
 });


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