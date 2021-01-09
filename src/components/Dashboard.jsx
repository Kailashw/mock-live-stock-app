import React, { useState, useEffect } from "react";
import * as bulma from "reactbulma";
import StocksList from "./StocksList.jsx";
import StocksGraph from "./StocksGraph.jsx";
import StocksLoaderStatus from "./StocksLoaderStatus.jsx";

const stocksUrl = "ws://stocks.mnet.website/";

export default function Dashboard({showSpinner, hideSpinner}) {
  const [stocks, setStocks] = useState({});
  const [market_trend, setMarket_trend] = useState({});
  const [connectionError, setConnectionError] = useState({});

  useEffect(() => {
    let connection = new WebSocket(stocksUrl);
    connection.onmessage = saveNewStockValues;
    return () => {
      connection.onclose = () => {
        setConnectionError(true);
      };
    };
  }, []);

  const saveNewStockValues = (event) => {
    hideSpinner();
    let result = JSON.parse(event.data);
    let [up_values_count, down_values_count] = [0, 0];

    // time stored in histories should be consisitent across stocks(better for graphs)
    let current_time = Date.now();
    let new_stocks = stocks;

    result.map((stock) => {
      if (stocks[stock[0]]) {
        new_stocks[stock[0]].current_value > Number(stock[1])
          ? up_values_count++
          : down_values_count++;

        new_stocks[stock[0]].current_value = Number(stock[1]);
        new_stocks[stock[0]].history.push({
          time: current_time,
          value: Number(stock[1]),
        });
      } else {
        new_stocks[stock[0]] = {
          current_value: stock[1],
          history: [{ time: Date.now(), value: Number(stock[1]) }],
          is_selected: false,
        };
      }
    });
    setStocks(new_stocks);
    setMarket_trend(newMarketTrend(up_values_count, down_values_count));
  };

  const newMarketTrend = (up_count, down_count) => {
    if (up_count === down_count) return undefined;
    return up_count > down_count ? "up" : "down";
  };

  const toggleStockSelection = (stock_name) => {
    let new_stocks = stocks;
    new_stocks[stock_name].is_selected = !new_stocks[stock_name].is_selected;
    setStocks(new_stocks);
  };

  const resetData = () => {
    let new_stocks = stocks;
    Object.keys(stocks).map((stock_name, index) => {
      new_stocks[stock_name].history = [new_stocks[stock_name].history.pop()];
    });
    setStocks(new_stocks);
  };

  const areStocksLoaded = () => {
    return Object.keys(stocks).length > 0;
  };

  return (
    <div className="container">
      <div className="columns">
        <StocksList
          stocks={stocks}
          toggleStockSelection={toggleStockSelection}
          resetData={resetData}
          market_trend={market_trend}
          areStocksLoaded={areStocksLoaded}
        />
        <StocksGraph stocks={stocks} />
      </div>
      <div className={showSpinner ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <StocksLoaderStatus connectionError={connectionError} />
        </div>
      </div>
    </div>
  );
}
