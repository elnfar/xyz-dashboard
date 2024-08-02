"use server";
import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const client = new PrismaClient();

export const getSessionUser = cache(async () => {
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

  return user;
});
