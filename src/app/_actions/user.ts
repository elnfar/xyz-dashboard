"use server";
import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const client = new PrismaClient();

export const getSessionUser = async () => {
  const session = await auth();

  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
    include: {
      tenant: true,
    },
    cacheStrategy:{
      ttl:360
    }
  });

  return user;
};
