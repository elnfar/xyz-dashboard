'use server'

import { prismaClient } from "@/lib/prisma";
import { getSessionUser } from "./user";

export async function getTeamMembers() {

    const user = await getSessionUser();

    const team = await prismaClient.tenant.findFirst({
        where: {
          id: user?.tenant.id,
        },
        include: {
          users: true,
          issues: true,
          projects: true,
        },
        cacheStrategy:{
          ttl:360
        }
      });

      return team;
}
