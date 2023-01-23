const axios = require("axios");


const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get('https://api.apilayer.com/exchangerates_data/latest?apikey=yYwDFStDRT5m3ZfEn5ob4c10t1b1d8Xy');
    const rate = response.data.rates;

    console.log(rate);
}

getExchangeRate('USD', 'EUR');