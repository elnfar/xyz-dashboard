"use server";

import { NewsletterValidator } from "@/lib/types.validators";
import { PrismaClient } from "@prisma/client";
import axios from "axios";



export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const client = new PrismaClient();

export async function onSubmitAction(
  data: FormData
){
  const formData = Object.fromEntries(data);
  const parsed = NewsletterValidator.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }





  const title = data.get('title') as string



  try {

    await axios.post('http://localhost:3000/api/newsletter', { title });


    console.log('Response:', title, "RESPONSEEEEE~!!!!!");
  } catch (error) {
    console.error('Error:', error);
  }

}