const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');


/* GET Stocks Data. */
router.get('/', async function(req, res, next) {
  try {
    res.json({'message': 'Working'});
  } catch (err) {
    console.error(`Error while getting stocks data`, err.message);
    next(err);
  }
});

function getStockSymbol(searchText) {
    const apiUrl = `${config.alphaVantageApiUrl}query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${config.alphaVantageApiKey}`;
    
    // resp = requests.get(_url).json()
    // try:
    //     stock_symbols_list = resp['bestMatches']
    //     for item in stock_symbols_list:
    //         if 'India' in item['4. region']:
    //             # print(item)
    //             return item['1. symbol'], item['2. name']
    // except KeyError:
    //     print("Error happened while parsing response of stock symbol search")
    // return '',''

}

router.get('/:stockName', async function(req, res, next) {
    try {
        const stockName = req.params.stockName;

        // api_url = 'https://www.alphavantage.co/query?'
        // print(get_stock_symbol(stock_name))
        // stock_symbol, stock_name = get_stock_symbol(stock_name)
        // if stock_symbol == '' or stock_name == '':
        //     return {'errorCode': 50001, 'message': 'Unable to find Stocks with the search name provided.'}

        // _url = f'{api_url}function=TIME_SERIES_DAILY&symbol={stock_symbol}&apikey={ALPHA_VANTAGE_API_KEY}'
        // resp = requests.get(_url).json()
        // resp['Meta Data']['6. Name'] = stock_name
        // return resp

        reqUrl = `${config.alphaVantageApiUrl}query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${config.alphaVantageApiKey}`;
        request(reqUrl, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            
        });
        res.json({'message': 'Working'});
    } catch (err) {
      console.error(`Error while getting stocks data`, err.message);
      next(err);
    }
  });

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    
  } catch (err) {
    console.error(`Error while creating`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    
  } catch (err) {
    console.error(`Error while deleting`, err.message);
    next(err);
  }
});

module.exports = router;