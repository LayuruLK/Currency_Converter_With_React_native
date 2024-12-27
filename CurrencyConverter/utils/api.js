export const fetchExchangeRate = async (fromCurrency, toCurrency) => {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    return data.rates[toCurrency];
};
