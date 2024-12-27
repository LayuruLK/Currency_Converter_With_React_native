import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { fetchExchangeRate } from '../utils/api';

const Converter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const convertCurrency = async () => {
        // Input validation
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            Alert.alert('Invalid Input', 'Please enter a valid amount');
            return;
        }

        setIsLoading(true);
        try {
            const rate = await fetchExchangeRate(fromCurrency, toCurrency);
            setConvertedAmount((rate * parseFloat(amount)).toFixed(2));
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch exchange rate. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>From Currency</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., USD"
                value={fromCurrency}
                onChangeText={setFromCurrency}
            />
            <Text style={styles.label}>To Currency</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g., EUR"
                value={toCurrency}
                onChangeText={setToCurrency}
            />
            <Text style={styles.label}>Amount</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles.button}>
                <Button title="Convert" onPress={convertCurrency} />
            </View>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {convertedAmount && (
                <Text style={styles.result}>
                    Converted Amount: {convertedAmount} {toCurrency}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        marginVertical: 10,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Converter;
