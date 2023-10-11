/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StripeProvider} from '@stripe/stripe-react-native';

import {ProductList} from './components/ProductList';
import {ProductPage} from './components/ProductPage';
import {Product} from './types';

const Stack = createNativeStackNavigator();

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51NzmdrDWNuWgSjc6fOndoyo51GmNVfBP354g4BDR2WXWkuqoTh72YY2hPWXvo9yKZ5VY0oNz0cWePZE1qukBXCUf00Ms2qqoHO';
const PRODUCTS: Product[] = [
  {
    name: 'Cauliflower',
    price: 399,
    unit: 'lb',
    thumbUrl:
      'https://www.thespruce.com/thmb/zMuVL9LUjk1jPSFs_dAXXCrxhsA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/how-to-grow-cauliflower-1403494-hero-76cf5f524a564adabb1ac6adfa311482.jpg',
  },
  {
    name: 'Asparagus',
    price: 449,
    unit: 'lb',
    thumbUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2023/03/Asparagus-spears-57ba27e.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    name: 'Beans',
    price: 299,
    unit: 'can',
    thumbUrl:
      'https://www.recipetineats.com/wp-content/uploads/2014/05/Homemade-Heinz-Baked-Beans_0.jpg?resize=650,910',
  },
  {
    name: 'Potatoes',
    price: 169,
    unit: 'lb',
    thumbUrl:
      'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-970-80.jpg.webp',
  },
  {
    name: 'Lettuce',
    price: 289,
    unit: 'bunch',
    thumbUrl: 'https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg',
  },
  {
    name: 'Tomatoes',
    price: 529,
    unit: 'lb',
    thumbUrl:
      'https://www.collinsdictionary.com/images/full/tomato_281240360_1000.jpg?version=5.0.11',
  },
  {
    name: 'Eggplant',
    price: 609,
    unit: 'lb',
    thumbUrl:
      'https://www.beaumont.org/images/default-source/news/eggplant-fotm.jpg?sfvrsn=3f0c7bef_2',
  },
  {
    name: 'Rhubarb',
    price: 799,
    unit: 'bunch',
    thumbUrl:
      'https://www.saveur.com/uploads/2019/03/18/YNRUXXY5O7VZ573XTB3SM5QETI.jpg?auto=webp&auto=webp&optimize=high&quality=70&width=1440&dpr=1',
  },
  {
    name: 'Kale',
    price: 419,
    unit: 'bunch',
    thumbUrl:
      'https://www.realsimple.com/thmb/uo30w5e984m8h4LBMhma_QHdVPc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/kale-not-salad-2000-5f64ac4a932b4940a56ade509e841408.jpg',
  },
].sort((a, b) => a.name.localeCompare(b.name));

type SectionProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

function Section({children, title, subtitle}: SectionProps): JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: Colors.black}]}>{title}</Text>
      <Text style={[styles.sectionDescription, {color: Colors.dark}]}>
        {subtitle}
      </Text>
      {children}
    </View>
  );
}

function App(): JSX.Element {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Products">
          <Stack.Screen name="Products" component={HomeScreen} />
          <Stack.Screen name="Detail" component={ProductScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

function HomeScreen() {
  return (
    <View style={{backgroundColor: Colors.white}}>
      <Section title="Veggies" subtitle="They're good for you">
        <ProductList products={PRODUCTS} />
      </Section>
    </View>
  );
}

function ProductScreen({route}) {
  return (
    <View style={{backgroundColor: Colors.white}}>
      <ProductPage product={route.params.product} />
    </View>
  );
}

function SuccessScreen({route}) {
  const {product} = route.params;

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: Colors.black}]}>Success!</Text>
      <Text style={[styles.sectionDescription, {color: Colors.dark}]}>
        Purchased {product.name} at ${(product.price / 100).toFixed(2)}/
        {product.unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
