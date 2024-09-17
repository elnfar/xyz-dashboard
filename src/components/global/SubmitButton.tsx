'use client';

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

export default function SubmitButton({title}:{
    title:string
}) {
    const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>{title}</Button>
    )
  }