"use server";

import { getSessionUser } from "@/app/_actions/user";

export const checkIsOnboarded = async () => {
  const user = await getSessionUser();
  if (user?.isOnboarded) {
    return true;
  }
  return false;
};