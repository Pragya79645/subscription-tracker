import mongoose from "mongoose"
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// req body is n obj cont data from client (post req)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Your sign-up logic here
        const { name , email, password } = req.body;

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error("User already exists with this email");
            error.statusCode = 409;
            throw error;
        }

        //hash password before saving (omitted for brevity)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data:{
                token,
                user: newUser[0]
            }
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export const signIn = async(req, res, next) => {}

export const signOut = async(req, res, next) => {}
