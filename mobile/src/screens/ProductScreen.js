import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProductScreen({ route }) {
  const { product } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>{product.title}</Text>
      <Text style={{ marginTop: 8 }}>{product.description}</Text>
      <Text style={{ marginTop: 8, fontSize: 18 }}>R{product.price}</Text>
      <Button title="Add to cart (stub)" onPress={() => alert('Add to cart: implement cart state and checkout flow.')} />
    </View>
  );
}
