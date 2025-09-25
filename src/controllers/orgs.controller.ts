import { Request, Response } from "express";
import Send from "@utils/response.utils";
import { prisma } from "../db";
import authSchema from "validations/auth.schema";
import bcrypt, { genSalt } from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import authConfig from "@config/auth.config";
export const postOrganization = async (req: Request, res: Response) => {
  const { name } = req.body as z.infer<typeof authSchema.org>;
  const userId = (req as any).userId;
  try {
    const isAdmin = await prisma.membership.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) {
      return Send.notfound(res, null, "User id is not found");
    }
    if (isAdmin.role == "ORG_ADMIN") {
      const createdOrg = await prisma.organization.create({
        data: {
          name: name,
        },
      });
      return Send.success(res, {
        id: createdOrg,
        name: createdOrg.name,
      });
    } else {
      return Send.unauthorized(
        res,
        null,
        "Unauthorized to post an organization"
      );
    }
  } catch (err) {
    console.error("Posting Organization failed", err);
    return Send.error(res, null, "Posting organization failed");
  }
};
export const getOrganization = async (req: Request, res: Response) => {
  const organization = [];
  const organizations = await prisma.organization.findMany();
  return Send.success(res, {
    organizations,
  });
};
export const postMemberToOrganization = async (req: Request, res: Response) => {
  const orgIdString = req.params.orgId;
  if (orgIdString == undefined) {
    return Send.notfound(res, null, "Org Id is undefined");
  }
  const orgId = Number.parseInt(orgIdString);

  const { userEmail, role } = req.body as z.infer<typeof authSchema.member>;
  const userId = (req as any).userId;
  try {
    const isAdmin = await prisma.membership.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) {
      return Send.notfound(res, null, "User id is not found");
    }
    if (isAdmin.role == "ORG_ADMIN") {
      const user = await prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });
      if (!user) {
        return Send.notfound(res, null, "User id with email is not found");
      }
      const createdOrg = await prisma.membership.create({
        data: {
          userId: user?.id,
          organizationId: orgId,
          role: role,
        },
      });
      return Send.success(res, {
        id: createdOrg,
        email: userEmail,
        role: role,
      });
    } else {
      return Send.unauthorized(
        res,
        null,
        "Unauthorized to post a Membership for this organization"
      );
    }
  } catch (err) {
    console.error("Posting member to organization failed", err);
    return Send.error(res, null, "Posting member to organization failed");
  }
};

export const postProjectToOrganization = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body as z.infer<typeof authSchema.org>;
  const orgId = req.params.orgId;
  if (orgId == undefined) {
    return Send.notfound(res, null, "Org Id is undefined");
  }
  const orgIdParsed = Number.parseInt(orgId);
  const userId = (req as any).userId;

  try {
    const isAdmin = await prisma.membership.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!isAdmin) {
      return Send.notfound(
        res,
        null,
        `User with user id ${userId} is not found`
      );
    }
    if (isAdmin.role == "ORG_ADMIN") {
      const organization = await prisma.organization.findUnique({
        where: {
            id: orgIdParsed
        }
      })
      if(organization == null){
        return Send.error(res, null, "Organization is not found")
      }
      const project = await prisma.project.create({
        data: {
          organizationId: orgIdParsed,
          name: name,
        },
      });

      return Send.success(res, {
        id: project.id,
        orgId: orgId,
        name: name,
      });
    } else {
      return Send.unauthorized(
        res,
        null,
        "Unauthorized to post a project for this organization"
      );
    }
  } catch (err) {
    console.error("Posting project to organization failed", err);
    return Send.error(res, null, "Posting project to organization failed");
  }
};

export const getProjectFromOrganization = async(req: Request, res: Response) => {
    const userId = (req as any).userId
    try{
    const isMember = await prisma.membership.findFirst({
        where: {
            userId: userId
        }
    });
    if(isMember == null){
        return Send.error(res, null, `User with user id ${userId} is not found`)
    }
    const orgId = req.params.orgId;
    if(orgId == undefined){
        return Send.notfound(res, null, `orgid is undefined`)
    }
    const orgIdparsed = Number.parseInt(orgId);
    if(isMember.role == "MEMBER"){
        const projects = await prisma.project.findMany({
            where:{
                organizationId: orgIdparsed
            }
        })
        return Send.success(res, {projects: projects} )
    }
            
    }catch(err){
        console.error("Failed to get project from organization:", err);
        return Send.error(res, null, "Failed to get project from organization");
    }
}
export const postReadingToProject = async(req: Request, res: Response) => {
    const projectID = req.params.projectId;
    if(projectID == undefined){
        return Send.notfound(res,null,"project ID is not found")
    };
    const {ts,quantity,unit,source} = req.body as z.infer<typeof authSchema.reading>
    try{

    }catch(err){
        console.error("failed to post reading to project: ",err)

    }

}