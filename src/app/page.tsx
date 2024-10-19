// src/app/page.tsx or src/pages/index.tsx
"use client";
import Navbar from "@/components/Navbar";
import Board from "@/components/Board";
import Analytics from "@/components/Analytics";
import React, { useState } from "react";

interface Card {
  id: string;
  name: string;
  order: number;
  columnId: string;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([
    { id: "card-1", name: "task 1", order: 0, columnId: "col-1" },
    { id: "card-2", name: "task 2", order: 1, columnId: "col-2" },
    { id: "card-3", name: "task 3", order: 2, columnId: "col-3" },
  ]);

  const totalCards = cards.length;
  const doneCards = cards.filter((card) => card.columnId === "col-3").length;

  const updateCards = (newCards: Card[]) => {
    setCards(newCards);
  };

  const columnData = [
    {
      name: "To Do",
      tasks: cards.filter((card) => card.columnId === "col-1").length,
    },
    {
      name: "In Progress",
      tasks: cards.filter((card) => card.columnId === "col-2").length,
    },
    {
      name: "Done",
      tasks: doneCards,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="board w-6/12">
          <Board cards={cards} updateCards={updateCards} />
        </div>
        <div className="analytics w-6/12">
          <Analytics
            totalCards={totalCards}
            doneCards={doneCards}
            columnData={columnData}
          />
        </div>
      </div>
    </>
  );
}
