// src/components/Analytics.tsx

import React from "react";

interface ColumnData {
  name: string;
  tasks: number;
}

interface AnalyticsProps {
  totalCards: number;
  doneCards: number;
  columnData: ColumnData[];
}

const Analytics: React.FC<AnalyticsProps> = ({
  totalCards,
  doneCards,
  columnData,
}) => {
  const completedPercentage =
    totalCards === 0 ? 0 : (doneCards / totalCards) * 100;

  return (
    <div className="bg-dark-gray w-80 flex flex-col items-start p-8 m-16 gap-5">
      <h2 className="text-2xl font-extrabold">Analytics</h2>

      {/* Pie Chart */}
      <div className="w-64 h-64 relative">
        {/* Outer circle for the pie chart */}
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
        purple ${completedPercentage}%, 
        white ${completedPercentage}% 100%
      )`,
          }}
        />
        {/* Inner circle to create the doughnut effect */}
        <div
          className="absolute inset-0 rounded-full bg-dark-gray"
          style={{ width: "75%", height: "75%", left: "12.5%", top: "12.5%" }}
        />
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          {completedPercentage.toFixed(0)}%
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-4 w-full">
        <h3 className="text-2xl font-extrabold mb-3">Task Distribution</h3>
        {columnData.map((column) => (
          <div key={column.name} className="flex items-center mb-2">
            <span className="w-24">{column.name}</span>
            <div
              className="h-4"
              style={{
                backgroundColor:
                  column.name === "To Do"
                    ? "red"
                    : column.name === "In Progress"
                    ? "yellow"
                    : "green",
                width: `${(column.tasks / totalCards) * 100 || 0}%`,
              }}
            />
            <span className="ml-2">{column.tasks}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
