// src/components/Board.tsx
"use client";
import React from "react";

interface Card {
  id: string;
  name: string;
  order: number;
  columnId: string;
}

interface Column {
  id: string;
  name: string;
  index: number;
}

interface BoardProps {
  cards: Card[];
  updateCards: (newCards: Card[]) => void;
}

const columns: Column[] = [
  { id: "col-1", name: "To Do", index: 0 },
  { id: "col-2", name: "In Progress", index: 1 },
  { id: "col-3", name: "Done", index: 2 },
];

const Board: React.FC<BoardProps> = ({ cards, updateCards }) => {
  const [draggedCardId, setDraggedCardId] = React.useState<string | null>(null);
  const [newCardName, setNewCardName] = React.useState<string>("");
  const [activeColumnId, setActiveColumnId] = React.useState<string | null>(
    null
  );
  const [editCardId, setEditCardId] = React.useState<string | null>(null);
  const [editCardName, setEditCardName] = React.useState<string>("");

  const handleDragStart = (id: string) => {
    setDraggedCardId(id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (columnId: string) => {
    if (draggedCardId) {
      const updatedCards = cards.map((card) =>
        card.id === draggedCardId ? { ...card, columnId } : card
      );
      updateCards(updatedCards);
      setDraggedCardId(null);
    }
  };

  const handleAddCard = (columnId: string) => {
    if (newCardName.trim() === "") return;

    const newCard: Card = {
      id: `card-${Date.now()}`,
      name: newCardName,
      order: cards.length + 1,
      columnId: columnId,
    };

    updateCards([...cards, newCard]);
    setNewCardName("");
    setActiveColumnId(null);
  };

  const handleDeleteCard = (cardId: string) => {
    updateCards(cards.filter((card) => card.id !== cardId));
  };

  const handleEditCard = (cardId: string, cardName: string) => {
    setEditCardId(cardId);
    setEditCardName(cardName);
  };

  const handleSaveEdit = (cardId: string) => {
    if (editCardName.trim() === "") return;

    updateCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, name: editCardName } : card
      )
    );
    setEditCardId(null);
    setEditCardName("");
  };

  return (
    <div className="bg-dark-gray p-8 m-16 w-10/12 h-160 overflow-auto">
      <div className="flex gap-8">
        {columns.map((column) => (
          <div key={column.id} className="bg-background font-semibold w-56 p-2">
            <div className="flex justify-between items-center">
              {column.name}
              <button
                onClick={() => setActiveColumnId(column.id)}
                className="font-normal bg-dark-gray text-2xl text-white hover:text-blue-700 rounded-full px-3"
              >
                +
              </button>
            </div>
            {activeColumnId === column.id && (
              <div className="flex my-2">
                <input
                  type="text"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  placeholder="New card name"
                  className="border border-gray-400 rounded p-1 mr-2 text-black w-40"
                />
                <button
                  onClick={() => handleAddCard(column.id)}
                  className="bg-blue-700 text-white rounded p-1"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-8 mt-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="w-56"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            {cards
              .filter((card) => card.columnId === column.id)
              .map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id)}
                  className="bg-background font-regular w-56 p-4 flex justify-between items-center text-center mt-2 cursor-pointer"
                >
                  {editCardId === card.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editCardName}
                        onChange={(e) => setEditCardName(e.target.value)}
                        className="border border-gray-400 rounded p-1 mr-2 text-black w-36"
                      />
                      <button
                        onClick={() => handleSaveEdit(card.id)}
                        className="bg-green-700 text-white rounded p-1"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <span>{card.name}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleEditCard(card.id, card.name)}
                          className="text-white hover:text-green-700 mx-1"
                          aria-label="Edit card"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-white hover:text-red-700 mx-1"
                          aria-label="Delete card"
                        >
                          &times;
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
