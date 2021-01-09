import React from "react";

export default function MarketTrendArrow({ current_trend }) {
  const getArrow = () => {
    if (current_trend === "up") {
      return <span className="up-arrow">&#8679;</span>;
    } else if (current_trend === "down") {
      return <span className="down-arrow">&#8681;</span>;
    } else {
      return "-";
    }
  };

  return (
    <span title="Market trend" className={"icon market-trend"}>
      {getArrow()}
    </span>
  );
}
