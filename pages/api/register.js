import bcryptjs from "bcryptjs";
import cookie from "cookie";
import { sign } from "../../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  console.log("REGISTER");
  const { fullname, email, password, checkbox } = req.body;
  if (!fullname || !email || !password) {
    res.status(400).json({
      success: false,
      message: "Please fill out all fields",
    });
  } else {
    console.log("CHECKING IF EMAIL EXISTS");
    // Check if user already exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exists, Please Login",
      });
    } else {
      console.log("REGISTERING");
      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);
      // Create user
      const newUser = await prisma.user.create({
        data: {
          name: fullname,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({
        success: true,
        message: "User created successfully, Please Login",
      });
    }
  }
};
