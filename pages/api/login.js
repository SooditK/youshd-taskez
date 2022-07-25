import bcryptjs from "bcryptjs";
import cookie from "cookie";
import { sign } from "../../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const { email, password, checkbox } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please fill out all fields",
    });
  } else {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      // User Not Found
      res.status(400).json({
        success: false,
        message: "User not found, Please Register",
      });
    } else {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        // Password Incorrect
        res.status(400).json({
          success: false,
          message: "Invalid Email or Password",
        });
      } else {
        const token = sign({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        });
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("taskez", token, {
            httpOnly: true,
            maxAge: checkbox ? 60 * 60 * 24 * 7 : null,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json({
          success: true,
          message: "Login Successful",
        });
      }
    }
  }
};
