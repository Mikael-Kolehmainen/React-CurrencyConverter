import axios from "axios";

const apiKey = ''; // add apilayer.com api key here.

async function updateResult() {
    const fromCurrencyValue = document.getElementById('fromCurrency').value;
    const toCurrencyValue = document.getElementById('toCurrency').value;
    const amountCurrencyValue = document.getElementById('amount').value;

    if (fromCurrencyValue
        && toCurrencyValue
        && amountCurrencyValue) {

        const resultElement = document.getElementById('result');

        resultElement.innerHTML = 'Result:<br>';

        convertCurrency(fromCurrencyValue, toCurrencyValue, amountCurrencyValue)
            .then((message) => {
                resultElement.innerHTML += message;
            }).catch((error) => {
                console.log(error);
            })
    }
}

export default updateResult;

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

    let countriesString = '';
    countries.forEach(countryName => {
        countriesString += countryName + ", ";
    });

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.<br/> You can spend these in the following countries: ${countriesString}`;
}