'use client';

import createProject from "@/app/_actions/createProject"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormStatus } from 'react-dom'
import { useToast } from "@/hooks/use-toast"
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
import useProjectModal from "@/hooks/useProjectModal";
import SubmitButton from "./SubmitButton";



export function CardWithForm() {
  const { toast } = useToast()
  const {onClose} = useProjectModal();
  
  return (
    <Card className="w-[350px">
      <CardHeader>
        <CardTitle>Create a project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <form 
      action={async (formData) => {
        try {
          await createProject(formData); // Await the project creation
          toast({
            title: "Project Created",
            description: "Your project was successfully created. It might take up to 2 minutes to reflect.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "There was an issue creating your project. Please try again.",
            variant: "destructive",
          });
        }
      }}
      >
      <CardContent className="">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Name of your project" className="text-white"/>
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
        <SubmitButton title="Create"/>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </CardFooter>
      </form>
    </Card>
  )
}


