'use client';

import React, { Dispatch, SetStateAction, useState, DragEvent } from "react";
import { motion } from "framer-motion";
import {Issue, IssueCategory, Project, User} from '@prisma/client'
import updateIssue from "@/app/_actions/updateIssue";
import Link from "next/link";
import ProjectNavbar from "@/app/[workplaceSlug]/(dashboard)/projects/_components/project-nav";



export const CustomKanban = ({ issues,projectId, users, projects }: { issues: Issue[],projectId:string, users:User[], projects:Project | null }) => {


  return (
    <div className=" text-neutral-50">
      <ProjectNavbar projectId={projectId} users={users} issues={issues} projects={projects}/>
      <Board issues={issues} />
    </div>
  );
};

const Board = ({ issues }: { issues: Issue[] }) => {
  const [cards, setCards] = useState<Issue[]>(issues);

  return (
    <div className="flex min-h-screen w-full gap-3 p-12">

      <Column
        title={IssueCategory.NEW}
        column={IssueCategory.NEW}
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title={IssueCategory.IN_PROGRESS}
        column={IssueCategory.IN_PROGRESS}
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title={IssueCategory.DONE}
        column={IssueCategory.DONE}
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: Issue[];
  column: IssueCategory;
  setCards: Dispatch<SetStateAction<Issue[]>>;
};

const Column = ({ title, headingColor, cards, column, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: Issue) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, category: column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);

      try {
        const formData = new FormData();
        formData.append('issueId', cardId);
        formData.append('category', column);

        await updateIssue(formData); // Assuming updateIssue handles the API call

        // Optionally, you can handle success or display a message here
      } catch (error) {
        console.error('Error updating issue:', error);
        // Handle error state or display error message
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.category === column);

  return (
    <div className="w-[35%]  shrink-0 px-4 border-[rgb(95,95,95)] border-r-[1px] overflow-y-hidden">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type CardProps = Issue & {
  handleDragStart: Function;
};

const Card = ({ title, id, category, handleDragStart }: CardProps) => {
  return (
    <Link href={`/issues/${id}`}>
      <DropIndicator beforeId={id} column={category} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, category })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 py-7 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </Link>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: IssueCategory;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

