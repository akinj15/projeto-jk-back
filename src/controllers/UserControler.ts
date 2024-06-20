import { Response, Request } from "express";
import { User } from "../models"
import { userService } from "../services";

class UserController {

  async create(request: Request, response: Response) {
    const body = request.body;
    const user: User = {
      userName: body.userName,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    }
    try {
      const res = await userService.create(user)
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
      if (!email) {
        throw new Error("login is required");
      }
      if (!password) {
        throw new Error("o password is required");
      }

      let token = await userService.login({email, password});
      return response.status(200).send({token: token});
    } catch (e) {
      return response.status(403).send({ error: e });
    }
  }

  async whoAmI(request: Request, response: Response) {
    try {
      let { authorization } = request.headers
      console.log(request.headers)
      if (!authorization) {
        throw new Error("autorization is required.");
      }
      let token = authorization.split(" ")[1]
      if (!token) {
        throw new Error("token unformed.");
      }
      let user = await userService.findByToken(token);

      return response.status(200).send({user})
    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }


  async listUsers(request: Request, response: Response) {
    try {
      let user = await userService.findAll();
      return response.status(200).send({user})
    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const { email, password, firstName, lastName, surName, id } = request.body;
      if (!email || !password || !firstName || !lastName || !surName || !id) {
        throw new Error("autorization is required.");
      }
      
      let user = await userService.updateUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        surName: surName,
        id: id,
      });

      return response.status(200).send({user})
    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }

}

export const userController = new UserController()
