import { Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import * as bcryptjs from "bcryptjs"
import config from "../../config"
import { prisma } from "../database";
import { User } from "../models"

class UserController {
  async create(request: Request, response: Response) {
    const body = request.body;
    const user: User = {
      userName: body.userName,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: await bcryptjs.hash(body.password, 8),
    }
    try {
      const res = await User.create(user)
      return response.status(201).send(res)
    } catch (error) {
      return response.status(500).send({
        error: "Registrer error",
        message: error
      })
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      let user;

      if (!email) {
        throw new Error("login is required");
      }
      if (!password) {
        throw new Error("o password is required");
      }

      let userDB: any = await User.findOne({ email: email });

      if (!userDB) {

        throw new Error("user name not found");
      }

      let passwordValid = await bcryptjs.compare(password, userDB.password)

      const token = jwt.sign({ id: userDB._id, email: userDB.email }, config.db.tokenSecret || "", {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      if (passwordValid) {
        user = {
          user: userDB,
          token: token
        };
      }
      else {
        throw new Error("invalid password")
      }
      return response.status(200).send(user);
    } catch (e) {
      return response.status(403).send({ error: e });
    }
  }

  async findAll(request: Request, response: Response) {
    let result = await User.find();
    return response.status(200).send(result)
  }
  async findUser(request: Request, response: Response) {
    const _id = request.query.id;
    try {
      if (!_id) {
        throw new Error("id is required");
      }
      let user = await User.findOne({ _id });

      return response.status(200).send(user)

    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }
  async editUser(request: Request, response: Response) {
    const { email, role, _id } = request.body;
    const { bio, description, firstName, lastName } = request.body.profile;
    const profile = {
      bio,
      description,
      firstName,
      lastName
    }
    try {
      let result = await User.updateOne(
        { _id: _id },
        {
          email,
          role,
          profile,
        }
      )
      return response.status(203).send(result)
    } catch (e) {
      return response.status(401).send(e)
    }
  }

  async deleteUser(request: Request, response: Response) {
    const id = request.query.id;
    try {
      let res = await User.deleteOne({ _id: id })
      return response.status(202).send(res);
    } catch (e) {
      return response.status(501).send(e)
    }
  }
}

export default new UserController()
