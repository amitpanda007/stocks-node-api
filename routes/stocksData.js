const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const config = require("../config");
const common = require("../services/common");

/* GET Stocks Data. */
router.get("/", async function (req, res, next) {
  try {
    res.json({ message: "Working" });
  } catch (err) {
    console.error(`Error while getting stocks data`, err.message);
    next(err);
  }
});

async function getStockSymbol(searchText) {
  try {
    const apiUrl = `${config.alphaVantageApiUrl}query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${config.alphaVantageApiKey}`;
    console.log(`Making API Request: ${apiUrl}`);
    const response = await fetch(apiUrl);
    const stocks = await response.json();

    if (stocks["bestMatches"]) {
      const stockData = stocks["bestMatches"];
      for (let i = 0; i < stockData.length; i++) {
        let stock = stockData[i];
        if (stock["4. region"].includes("India")) {
          const stockInfo = {
            symbol: stock["1. symbol"],
            stockName: stock["2. name"],
            status: true,
          };
          return stockInfo;
        }
      }
      return { status: false };
    }
  } catch (error) {
    console.log(error.response.body);
  }
}

router.get("/:stockName", async function (req, res, next) {
  try {
    const stockName = req.params.stockName;
    const stockSymbol = await getStockSymbol(stockName);

    // When no data found
    if (stockSymbol.status == false) {
      res.json({
        errorCode: 50001,
        message: "Unable to find Stocks with the search name provided.",
      });
    }
    console.log(stockSymbol);
    reqUrl = `${config.alphaVantageApiUrl}query?function=TIME_SERIES_DAILY&symbol=${stockSymbol.symbol}&apikey=${config.alphaVantageApiKey}`;
    console.log(`Making API Request: ${reqUrl}`);
    const response = await fetch(reqUrl);
    let stocksData = await response.json();
    console.log("Received Response");
    // console.log(stocksData);
    stocksData["Meta Data"]["6. Name"] = stockSymbol.stockName;
    const formattedData = common.formatStocksResponse(stocksData);
    res.send(formattedData);
  } catch (err) {
    console.error(`Error while getting stocks data`, err.message);
    next(err);
  }
});

/* POST programming language */
router.post("/", async function (req, res, next) {
  try {
  } catch (err) {
    console.error(`Error while creating`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put("/:id", async function (req, res, next) {
  try {
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete("/:id", async function (req, res, next) {
  try {
  } catch (err) {
    console.error(`Error while deleting`, err.message);
    next(err);
  }
});

module.exports = router;
