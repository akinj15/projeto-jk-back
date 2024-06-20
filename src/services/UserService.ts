import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs"
import config from "../../config"
import { prisma } from "../database";
import { User, UserUpdateInput } from "../models"

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
  
  async findAll() {
    let userDB = await prisma.user.findMany();
    return userDB.map((e)=> {
      return {
        id: e.id,
        email: e.email,
        firstName: e.firstName,
        lastName: e.lastName,
        userName: e.userName,
        roleId: e.roleId,
        surName: e.surName,
      }
    });
  }

  async updateUser(user: UserUpdateInput) {
    let userDB = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        surName: user.surName,
      }
    });
    return { ... userDB, 
      password: undefined,
      token: undefined,
    };
  }
  
}

export const userService = new UserService();