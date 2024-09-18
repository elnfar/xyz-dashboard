"use server";
import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";

export const getSessionUser = async () => {
  const session = await auth();

  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
    include: {
      tenant: true,
    },
  });

  return user;
};
