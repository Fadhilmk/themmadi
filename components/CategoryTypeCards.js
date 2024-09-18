

import React from "react";

const CategoryTypeCards = ({
  categoryTotals,
  typeTotals,
  conversationDirections,
  totalConversations,
  totalCost,
}) => {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Category Totals Card */}
        <div className="text-gray-900 p-6 rounded-2xl bg-blue-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Category Totals</h2>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <div key={category} className="mb-4">
              <p className="text-lg font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{category} :</p>
              <p className="text-xl font-bold text-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{total}</p>
            </div>
          ))}
        </div>

        {/* Type Totals Card */}
        <div className="text-gray-900 p-6 rounded-2xl bg-blue-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Type Totals</h2>
          {Object.entries(typeTotals).map(([type, total]) => (
            <div key={type} className="mb-4">
              <p className="text-lg font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{type} :</p>
              <p className="text-xl font-bold text-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{total}</p>
            </div>
          ))}
        </div>

        {/* Conversation Directions Card */}
        <div className="text-gray-900 p-6 rounded-2xl bg-blue-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Conversation Directions</h2>
          {Object.entries(conversationDirections).map(([direction, total]) => (
            <div key={direction} className="mb-4">
              <p className="text-lg font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{direction} :</p>
              <p className="text-xl font-bold text-blue-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{total}</p>
            </div>
          ))}
        </div>

        {/* Summary Card for Total Conversations and Total Cost */}
        <div className="text-gray-900 p-6 rounded-2xl bg-blue-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 border-b border-blue-300 pb-2 text-center" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Summary</h2>
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Conversations:</p>
            <p className="text-2xl font-extrabold text-blue-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>{totalConversations}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700" style={{fontFamily: "LeagueSpartan, sans-serif"}}>Total Cost:</p>
            <p className="text-2xl font-extrabold text-yellow-600" style={{fontFamily: "LeagueSpartan, sans-serif"}}>${totalCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryTypeCards;
