import { getSessionUser } from "@/app/_actions/user";
import { prismaClient } from "@/lib/prisma";

export async function GET(request: Request) {

    const user = await getSessionUser();

    if(!user) throw new Error('No user!');



    const workpalce = await prismaClient.tenant.findUnique({
        where:{
            id:user.tenantId
        }
    })
    if(!workpalce) return [];

    return workpalce;
}
