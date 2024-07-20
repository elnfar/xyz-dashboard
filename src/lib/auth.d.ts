// next-auth.d.ts
import { User } from "next-auth";

 declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: User & { id: string };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: User & { id: string };
  }
}

