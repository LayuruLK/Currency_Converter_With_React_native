import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { fetchExchangeRate } from '../utils/api'

const Converter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);

    const convertCurrency = async () => {
        const rate = await fetchExchangeRate(fromCurrency, toCurrency);
        setConvertedAmount((rate * parseFloat(amount)).toFixed(2));
    };

    return (
        <View>
             <TextInput
                placeholder="From Currency"
                value={fromCurrency}
                onChangeText={setFromCurrency}
            />
            <TextInput
                placeholder="To Currency"
                value={toCurrency}
                onChangeText={setToCurrency}
            />
            <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Button title="Convert" onPress={convertCurrency} />
            {convertedAmount && <Text>Converted Amount: {convertedAmount}</Text>}
        </View>
    );
};

export default Converter;
