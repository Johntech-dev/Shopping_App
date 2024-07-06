import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api.timbu.cloud/products', {
        params: {
          organization_id: 'c85a2c75b0fb4aa39e77f64fc745ea97',
          reverse_sort: false,
          page: 1,
          size: 10,
          Appid: 'YNDL9X5IC18AX85',
          Apikey: '8b1145491d57428197ef67f6c82da62c20240704212401327534',
        },
      });
      setProducts(response.data.items);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!products || products.length === 0) {
    return <Text style={styles.noProductsText}>No products found</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.productCard}>
          <Image source={{ uri: `https://api.timbu.cloud/images/${item.photos?.[0]?.url}` }} style={styles.image} />
          <View style={styles.productDetails}>
            <View style={styles.productInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {item.current_price && item.current_price.length > 0 ? `₦ ${item.current_price[0].NGN}` : 'Price not available'}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <View style={item.is_available ? styles.available : styles.unavailable}>
              <Text style={styles.availabilityText}>{item.is_available ? "Available" : "Not Available"}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  noProductsText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  productCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  productInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#4caf50',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  available: {
    backgroundColor: '#8fe9b4',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  unavailable: {
    backgroundColor: '#e57373',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  availabilityText: {
    color: 'white',
  },
});

export default ProductScreen;
