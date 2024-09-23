"use client";

import createIssue from "@/app/_actions/createIssue";
import SubmitButton from "@/components/global/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import useIssuesModal from "@/hooks/useIssuesModal";
import useProjectModal from "@/hooks/useProjectModal";
import { User } from "@prisma/client";

export function IssueDialog({
  projectId,
  users,
}: {
  projectId: string;
  users: User[];
}) {
  const { onClose } = useIssuesModal();

  return (
    <Card className="w-[450px">
      <CardHeader>
        <CardTitle>Create an issue</CardTitle>
        <CardDescription>
          Fill in the details and create your issues to work on it!
        </CardDescription>
      </CardHeader>
      <form action={createIssue}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="">
              <Input
                id="title"
                name="title"
                placeholder="New issue"
                className="col-span-3 text-white"
              />
            </div>

            <div className="">
              <Input
                id="projectId"
                type="hidden"
                name="projectId"
                value={projectId}
                className="text-black"
              />
            </div>
            <div className="">
              <textarea
                id="description"
                name="description"
                placeholder="Issue description"
                className=" w-full p-4 border focus-within:normal-case active:normal-case text-white"
                rows={12}
                cols={48}
              />
            </div>

            <select
              name="userId"
              id="userId"
              className="mt-2 border-2 px-4 py-3 text-white"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
            <div className="space-x-4">
              <SubmitButton title="Create" />
              <Button
                type="button"
                variant="secondary"
                className="bg-black text-white"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
