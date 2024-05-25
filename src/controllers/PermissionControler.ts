import { Response, Request } from "express";
import { Role } from "../models"
import { permissionService } from "../services";

class PermissionController {

  async create(request: Request, response: Response) {
    const body = request.body;
    const role: Role = {
      name: body.name,
      color: body.color,
      keywords: body.keywords,
    }
    try {
      const res = await permissionService.createRole(role)
      return response.status(201).send(res)
    } catch (error) {
      return response.status(500).send({  
        error: "Registrer error",
        message: error
      })
    }
  }

  async assingRole(request: Request, response: Response) {
    const { userId, roleId } = request.body;
    try {
      if (!userId) {
        throw new Error("userId is required");
      }
      if (!roleId) {
        throw new Error("roleId is required");
      }

      await permissionService.assingRole({ roleId, userId });
      return response.status(200).send();
    } catch (e) {
      return response.status(403).send({ error: e });
    }
  }

  async listRoles(request: Request, response: Response) {
    try {
      let roles = await permissionService.listRoles();

      return response.status(200).send(roles)
    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }

  async deleteRole(request: Request, response: Response) {
    try {
      let { roleId } = request.params;
      let roles = await permissionService.deleteRole({ roleId });

      return response.status(200).send(roles)
    } catch (e) {
      return response.status(401).send({ error: e })
    }
  }
}

export const permissionController = new PermissionController()
