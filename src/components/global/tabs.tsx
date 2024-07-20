import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import React from "react";

interface Tab {
  name: string;
  value: string;
  content:React.ReactElement
}

interface TabsProps {
  tabCardTitle: string;
  tabCardDescription: string;
  defaultValue: string;
  values: Tab[];
}

export function DashboardTabs({
  values,
  defaultValue,
  tabCardTitle,
  tabCardDescription,
}: TabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-[400px] bg-black-900 p-2 bg-black/[0.96] rounded-lg">
      <TabsList className="grid w-full grid-cols-2 bg-black/[0.96]">
        {values.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {values.map((item) => (
        <TabsContent key={item.value} value={item.value} className="bg-zinc-900">
          <Card className="bg-black/[.6]">
            <CardHeader>
              <CardTitle>{tabCardTitle}</CardTitle>
              <CardDescription>{tabCardDescription}</CardDescription>
            </CardHeader>
              <CardContent className="space-y-2">{item.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
