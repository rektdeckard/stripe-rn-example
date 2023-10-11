import {useState, useEffect} from 'react';
import {Button, Image, Text, TextInput, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {usePaymentSheet} from '@stripe/stripe-react-native';

import {Product} from '../types';
import API from '../api';

type ProductPageProps = {
  product: Product;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  price: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
  input: {
    color: 'black',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 16,
    marginBottom: 16,
    padding: 8,
  },
  heroImage: {
    width: '100%',
    height: 256,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

export function ProductPage({product}: ProductPageProps) {
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const [amount, setAmount] = useState(1);

  const {
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment,
    loading,
  } = usePaymentSheet();

  useEffect(() => {
    (async () => {
      const intent = await API.setupPayment(product, amount);
      //   console.log({intent});

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'TEST',
        paymentIntentClientSecret: intent.client_secret,
        allowsDelayedPaymentMethods: true,
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: true,
          currencyCode: 'usd',
        },
      });

      //   console.log({error});

      if (!error) {
        setReady(true);
      }
    })();
  }, [amount]);

  async function showPaymentSheet() {
    const {error: sheetError} = await presentPaymentSheet();
    if (sheetError) {
      //   console.error(sheetError);
      return;
    }
    navigation.navigate('Success', {product});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>
        ${(product.price / 100).toFixed(2)}/{product.unit}
      </Text>
      <Image
        source={{uri: product.thumbUrl}}
        resizeMode="cover"
        style={styles.heroImage}
      />
      <Text style={styles.price}>Amount</Text>
      <TextInput
        inputMode="numeric"
        placeholder="Amount"
        style={styles.input}
        value={amount.toString()}
        onChange={e => setAmount(Number(e.nativeEvent.text))}
      />
      <Button
        title="PURCHASE"
        onPress={showPaymentSheet}
        disabled={loading || !ready || amount <= 0}
      />
    </View>
  );
}
