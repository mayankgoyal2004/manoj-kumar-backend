import React from "react";

export default function CardGrid({ items, renderCard, columns = 4, className = "" }) {
  const colCls = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-5 ${colCls} ${className}`}>
      {items.map((item, index) => (
        <div key={item.id || index} className="animate-rise" style={{ animationDelay: `${index * 35}ms` }}>
          {renderCard(item)}
        </div>
      ))}
    </div>
  );
}