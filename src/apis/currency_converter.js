const axios = require("axios");

const apiKey = 'yYwDFStDRT5m3ZfEn5ob4c10t1b1d8Xy';

const getExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await axios.get(`https://api.apilayer.com/exchangerates_data/latest?apikey=${apiKey}`);

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }

    return exchangeRate;
}

const getCountries = async (toCurrency) => {
    try {
        const response = await axios.get(`https://api.apilayer.com/geo/country/currency/${toCurrency}?apikey=${apiKey}`);

        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    }
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries =  await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
}

convertCurrency('USD', 'EUR', 20)
    .then((message) =>  {
        console.log(message);
    }).catch((error) => {
        console.log(error);
    })