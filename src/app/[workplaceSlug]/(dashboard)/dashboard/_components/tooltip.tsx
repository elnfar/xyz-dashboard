"use client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { User } from "@prisma/client";
import React from "react";



export function Tooltip({people}:{
    people:User
}) {
  return (
      <AnimatedTooltip id={people.id} image={people.image} name={people.name} />
  );
}
