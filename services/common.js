const dateFormat = require("dateformat");

function formatStocksResponse(data) {
  const stocksMetaData = data["Meta Data"];
  const timeSeries = data["Time Series (Daily)"];

  const metaData = {
    information: stocksMetaData["1. Information"],
    symbol: stocksMetaData["2. Symbol"],
    lastRefreshed: stocksMetaData["3. Last Refreshed"],
    outputSize: stocksMetaData["4. Output Size"],
    timeZone: stocksMetaData["5. Time Zone"],
    name: stocksMetaData["6. Name"],
  };

  let stocksData = [];
  Object.entries(timeSeries).forEach((stockPerDay) => {
    const stockDate = stockPerDay[0];

    // Convert Date
    const newDate = new Date(stockDate).toDateString();
    const formatDate = dateFormat(newDate, "dd-mmm-yy");

    const singleStockData = {
      open: stockPerDay[1]["1. open"],
      high: stockPerDay[1]["2. high"],
      low: stockPerDay[1]["3. low"],
      close: stockPerDay[1]["4. close"],
      volume: stockPerDay[1]["5. volume"],
    };

    const perDayData = {
      date: formatDate,
      stock: singleStockData,
    };
    stocksData.push(perDayData);
  });

  const formattedResponse = {
    metaData: metaData,
    stocksData: stocksData,
  };
  return formattedResponse;
}

module.exports = {
  formatStocksResponse,
};
