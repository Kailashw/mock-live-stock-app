import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import TimeAgo from "react-timeago";

// export default StockRow;
export default function StockRow({
  stock_name,
  stock_data,
  toggleStockSelection,
}) {
  const getStockValueColor = (stock) => {
    if (stock.current_value < stock.history.slice(-2)[0].value) {
      return "red";
    } else if (stock.current_value > stock.history.slice(-2)[0].value) {
      return "green";
    } else {
      return null;
    }
  };

  return (
    <tr
      className={stock_data.is_selected ? "selected" : null}
      id={stock_name}
      onClick={toggleStockSelection.bind(this, stock_name)}
    >
      <td>{stock_name.toUpperCase()}</td>
      <td className={getStockValueColor(stock_data)}>
        {stock_data.current_value.toFixed(2)}
      </td>
      <td>
        <Sparklines
          data={stock_data.history.map((history) => {
            return history.value;
          })}
        >
          <SparklinesLine color="blue" />
        </Sparklines>
      </td>
      <td className="updated_at">
        <TimeAgo date={stock_data.history.slice(-1)[0].time} />
      </td>
    </tr>
  );
}
