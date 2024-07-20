
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {

    const user = await auth()

    return NextResponse.json(user)

}  
