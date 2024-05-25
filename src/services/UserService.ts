import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs"
import config from "../../config"
import { prisma } from "../database";
import { User } from "../models"

class UserService {
  async create(user: User) {
    let password = await bcryptjs.hash(user.password, 8);
    try {
      let res = await prisma.user.create({
        data: {
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: password,
          roleId: '7a509a9b-35e6-4df1-9adf-c8d4d3ccf9fc'
        }
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async login(data: { email: string, password: string }) {
    const { email, password } = data;
    if (!email) {
      throw new Error("login is required");
    }
    if (!password) {
      throw new Error("o password is required");
    }

    let userDB = await prisma.user.findUnique({ where: { email: email } });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    let passwordValid = await bcryptjs.compare(password, userDB.password)

    const token = jwt.sign({ id: userDB.id, email: userDB.email }, config.db.tokenSecret || "", {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    if (passwordValid) {
      await prisma.user.update({ where: {email : email}, data: { token: token }})
      return token;
    }
    else {
      throw new Error("invalid password")
    }
  }

  async findByToken(token: string) {

    let userDB = await prisma.user.findUnique({ where: { token: token } });

    if (!userDB?.password || !userDB?.email || !userDB?.id) {
      throw new Error("user not found");
    }

    return userDB;
  }
  
}

export const userService = new UserService();