'use client';

import createProject from "@/app/_actions/createProject"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useProjectModal from "@/hooks/useProjectModal"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";



export function CardWithForm() {

  const router = useRouter();

  const {onClose} = useProjectModal()


  async function onCreate(data:FormData) {

    await createProject(data);
    router.refresh();
    onClose();
  }


  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <form action={onCreate}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="industry">Industry</Label>
              <Select name="industry" required>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit">Create</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </CardFooter>
      </form>
    </Card>
  )
}
