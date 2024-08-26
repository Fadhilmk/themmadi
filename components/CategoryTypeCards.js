

import React from "react";


const CategoryTypeCards = ({
  categoryTotals,
  typeTotals,
  conversationDirections,
  totalConversations,
  totalCost,
}) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category Totals Card */}
        <div className="bg-white text-gray-900 p-6 rounded-2xl border-2 border-blue-300 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2">Category Totals</h2>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category} className="mb-4">
              <p className="text-lg font-medium text-gray-700">{category} :</p>
              <p className="text-xl font-bold text-blue-600">{total}</p>
            </div>
          ))}
        </div>

        {/* Type Totals Card */}
        <div className="bg-white text-gray-900 p-6 rounded-2xl border-2 border-blue-300 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2">Type Totals</h2>
          {Object.entries(typeTotals).map(([type, total]) => (
            <div key={type} className="mb-4">
              <p className="text-lg font-medium text-gray-700">{type} :</p>
              <p className="text-xl font-bold text-blue-600">{total}</p>
            </div>
          ))}
        </div>

        {/* Conversation Directions Card */}
        <div className="bg-white text-gray-900 p-6 rounded-2xl border-2 border-blue-300 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2">Conversation Directions</h2>
          {Object.entries(conversationDirections).map(([direction, total]) => (
            <div key={direction} className="mb-4">
              <p className="text-lg font-medium text-gray-700">{direction} :</p>
              <p className="text-xl font-bold text-blue-600">{total}</p>
            </div>
          ))}
        </div>

        {/* Summary Card for Total Conversations and Total Cost */}
        <div className="bg-white text-gray-900 p-6 rounded-2xl border-2 border-blue-300 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2">Summary</h2>
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700">Total Conversations:</p>
            <p className="text-2xl font-extrabold text-blue-700">{totalConversations}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Total Cost:</p>
            <p className="text-2xl font-extrabold text-yellow-600">${totalCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTypeCards;
