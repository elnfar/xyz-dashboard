import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const session = await auth();

    if(!session) throw new Error('Auth error, no session found');

    const user = await prismaClient.user.findUnique({
        where:{
            email:session.user?.email!
        },
        include:{
            tenant:true
        }
    })

    return Response.json({user});
}
