import { z } from "zod";

let titleLength = 4;

export const ProjectSchema = z.object({
    name: z.string().min(titleLength, {
        message:`minimum title length must be ${titleLength}`
    }),
    industry:z.string()
  })
  