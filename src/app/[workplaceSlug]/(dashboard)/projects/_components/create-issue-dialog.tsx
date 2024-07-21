'use client'

import createIssue from "@/app/_actions/createIssue"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import useProjectModal from "@/hooks/useProjectModal"
import { User } from "@prisma/client"




export function IssueDialog({ projectId,users }:{
    projectId:string,
    users:User[]
}) {

  const {onClose} = useProjectModal()

  return (
    <Card className="w-[450px]">

      <CardHeader>
        <CardTitle>Create an issue</CardTitle>
        <CardDescription>Fill in the details and create your issues to work on it!</CardDescription>
      </CardHeader>
        <form action={createIssue}>
          <CardContent>
          <div className="grid w-full items-center gap-4">
          <div className="">
            <Input id="title" name="title" placeholder="New project" className="col-span-3" />
          </div>

          <div className="">
            <Input id="projectId" type="hidden" name="projectId" value={projectId}/>
          </div>
          <div className="">
            <textarea id="description" name="description" placeholder="Project description" className=" w-full p-4 border focus-within:normal-case active:normal-case" rows={12} cols={48}/>
          </div>

          <select  name="userId" id="userId" className="mt-2 border-2 px-4 py-3">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email} 
                </option>
              ))}
            </select>
          <div className="space-x-4">
            <Button type="submit" variant="secondary" className="bg-black text-white">Create</Button>
            <Button type="button" variant="secondary" className="bg-black text-white" onClick={onClose}>Cancel</Button>
          </div>
          </div>
          </CardContent>
          
        </form>

    </Card>
  )
}

/*
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
        <Button type="submit">Deploy</Button>
      </CardFooter>
      </form>
    </Card>

*/