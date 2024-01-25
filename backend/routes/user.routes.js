
const {
    addNewUser,
    getUsersInfo,
    updateUserInfo,
    removeUser
} = require('../controller/user.controller')

const { Router } = require('express');
const userRouter = Router();


userRouter.post("/add", addNewUser);

userRouter.get("/view", getUsersInfo);

userRouter.patch("/edit/:userId", updateUserInfo);

userRouter.put("/edit/:userId", updateUserInfo);

userRouter.delete("/delete/:userId", removeUser);


module.exports = { userRouter };