import { z } from "zod"

export const NewsletterValidator = z.object({
    title:z.string().min(15, "min 15")
    .max(50, {
        message: 'Title must be less than 50 characters long',
      }),
})


export type NewsletterRequest = z.infer<typeof NewsletterValidator>