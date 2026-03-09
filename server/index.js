import dotenv from "dotenv";
import express from "express";
import jwt from 'jsonwebtoken';
import { isAuthenticated } from "./middleware/auth.js";
import prisma from './utils/prisma.js';
import { sendToken } from './utils/sendToken.js';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100mb" }));

// user login
app.post("/login", async (req, res) => {
    try {
        const { signedToken } = req.body ?? {};

        if (!signedToken || typeof signedToken !== "string") {
            return res.status(400).json({
                success: false,
                message: "signedToken is required.",
            });
        }

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: "Server misconfiguration: JWT_SECRET_KEY is missing.",
            });
        }

        let data;
        try {
            data = jwt.verify(signedToken, process.env.JWT_SECRET_KEY);
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "Invalid token.",
            });
        }

        const email = typeof data?.email === "string" ? data.email.trim() : "";
        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Email is missing in token payload. If logging in via GitHub, fetch the user's primary email from /user/emails (scope: user:email) and include it.",
            });
        }
        const name = typeof data?.name === "string" ? data.name : "";
        const avatar = typeof data?.avatar === "string" ? data.avatar : null;
        const githubUserName =
            typeof data?.githubUserName === "string" ? data.githubUserName.trim() : null;

        const isUserExist = await prisma.user.findUnique({
            where: { email },
        });

        if (isUserExist) {
            const updateData = {};
            if (name && !isUserExist.name) updateData.name = name;
            if (avatar && !isUserExist.avatar) updateData.avatar = avatar;
            if (githubUserName && !isUserExist.githubUserName) updateData.githubUserName = githubUserName;

            if (Object.keys(updateData).length > 0) {
                const updatedUser = await prisma.user.update({
                    where: { id: isUserExist.id },
                    data: updateData,
                });
                return await sendToken(updatedUser, res);
            }

            return await sendToken(isUserExist, res);
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                avatar,
                githubUserName,
            },
        });

        return await sendToken(user, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});

//me 
app.get("/me",isAuthenticated, async (req, res) => {
   try {
    const user = req.user
    res.status(201).json({
        success: true,
        user
    })

   } catch (error) {
    console.log(`Me: ${error}`)
   }   
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});