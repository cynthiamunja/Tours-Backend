import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import mssql from 'mssql';
import { sqlConfig } from '../config';
import { log } from 'console';
import { RegisterSchema } from '../Helpers';
import Bcrypt from 'bcrypt'
import { User,Payload } from '../models/authModel';
import jwt from 'jsonwebtoken'
import path from 'path';
import dotenv from 'dotenv';
import { DbHelper } from '../DataBaseHelper'
import { sendRegistrationEmail } from '../utils/email';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const dbInstance = new DbHelper()

export const registerUser = async (req: Request, res: Response) => {
    try {
        const id = uid();
        const { UserName, Email, UserPassword } = req.body;

        // Validate request body against schema
        const { error } = RegisterSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        // Validate password against pattern
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(UserPassword)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long." });
        }

        const HashPassword = await Bcrypt.hash(UserPassword, 10);

        // Insert user into database
        await dbInstance.exec('AddUsers', { UserID: id, UserName, Email, UserPassword: HashPassword });

        // Send registration email to the user
        await sendRegistrationEmail(Email, UserName);

        res.status(201).json({ message: "User Created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login=async(req:Request, res:Response)=>{
    try{
        const {Email, UserPassword}=req.body
        let pool= await mssql.connect(sqlConfig)

       let user= (await pool.request()

        .input("Email",Email)
    
        .execute('getOneUser')).recordset as User[]
       
        
        if (user.length !==0){
            const isValid=await Bcrypt.compare(UserPassword, user[0].UserPassword)

        if (isValid){
            const payload:Payload={
                UserID:user[0].UserID,
                UserName:user[0].UserName,
                Email:user[0].Email
            }
              const token= jwt.sign(payload, process.env.SECRET as string,{expiresIn:'2h'})
            return res.status(200).json({message:"Login Successful!", token})
        }

        }
        

        return res.status(400).json({message:"invalid credentials"})
       // return res.status(200).json(user)
    } catch(error){
        res.status(400).json(error)
    }

}

export const Adminlogin = async (req: Request, res: Response) => {
    try {
        const { Email, UserPassword } = req.body;
        let pool= await mssql.connect(sqlConfig)
        let user= (await pool.request()

        .input("Email",Email)
    
        .execute('getOneUser')).recordset as User[]
        
        const isValid=await Bcrypt.compare(UserPassword, user[0].UserPassword)

        // Check if the email and password are the admin credentials
        if (Email === process.env.ADMINEMAIL && isValid) {
            const payload: Payload = {
                UserID: user[0].UserID,
                UserName: user[0].UserName,
                Email:user[0].Email
            };
            const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' });
            return res.status(200).json({ message: "Admin Login Successful!", token });
        }

        // let pool = await mssql.connect(sqlConfig);

        // let user = (await pool.request()
        //     .input("Email", Email)
        //     .execute('getOneUser')).recordset as User[];

        // if (user.length !== 0) {
        //     const isValid = await Bcrypt.compare(UserPassword, user[0].UserPassword);

        //     if (isValid) {
        //         const payload: Payload = {
        //             UserID: user[0].UserID,
        //             UserName: user[0].UserName
        //         };
        //         const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' });
        //         return res.status(200).json({ message: "Login Successful!", token });
        //     }
        // }

        return res.status(400).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(400).json(error);
    }
}
