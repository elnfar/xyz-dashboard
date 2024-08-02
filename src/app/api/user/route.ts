import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await auth();
  if(!session) throw new Error("Not authenticated")

  const user = await prismaClient.user.findUnique({
    where: {
      email: session.user?.email as unknown as string,
    },
    include: {
      tenant: true,
    },
  });

  return NextResponse.json({user});
};
