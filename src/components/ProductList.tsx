import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Product} from '../types';

type ProductListProps = {
  products: Product[];
};

type ProductItemProps = {
  product: Product;
};

const styles = StyleSheet.create({
  grid: {
    marginHorizontal: 'auto',
  },
  item: {
    flex: 1,
    minWidth: 48,
    maxWidth: '33%',
    minHeight: 128,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  background: {
    flex: 1,
    width: '100%',
    minHeight: 128,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 16,
  },
  title: {
    color: 'white',
    backgroundColor: 'black',
    padding: 8,
    marginBottom: 4,
    fontSize: 16,
    borderRadius: 8,
  },
  linearGradient: {
    flex: 1,
  },
});

export function ProductList({products}: ProductListProps) {
  return (
    <View>
      <FlatList
        style={styles.grid}
        numColumns={3}
        data={products}
        renderItem={({item}) => <ProductItem product={item} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

function ProductItem({product}: ProductItemProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', {product})}>
      <ImageBackground
        source={{uri: product.thumbUrl}}
        style={styles.background}
        imageStyle={styles.image}
        resizeMode="cover">
        <Text style={styles.title}>{product.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
