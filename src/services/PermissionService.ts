import { prisma } from "../database";
import { Role } from "../models"

class PermissionService {
  async createRole(role: Role) {
    try {
      let res = await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: {
          color: role.color,
          keywords: role.keywords,
          name: role.name,
        }
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async assingRole(data: { roleId: string, userId: string }) {
    const { roleId, userId } = data;
    if (!roleId) {
      throw new Error("Role Id is required");
    }
    if (!userId) {
      throw new Error("User Id is required");
    }

    let userDB = await prisma.user.update({ 
      where: { id: userId },
      data: {
        roleId: roleId
      }
    });

    if (!userDB?.id) {
      throw new Error("user not found");
    }

  }

  async listRoles() {
    let roles = await prisma.role.findMany();
    return roles;
  }


  async deleteRole(data: {roleId: string}) {
    let { roleId } = data;
    if (!roleId) {
      throw new Error("roleId is required")
    }
    let roles = await prisma.role.delete({where: { id: roleId }});
    if (!roles) {
      throw new Error("role not found")
    }
    return roles;
  }


}

export const permissionService = new PermissionService();