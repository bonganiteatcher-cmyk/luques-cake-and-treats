import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// read from env or hardcode during dev
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'public-anon-key';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase.from('products').select('*').then(({ data, error }) => {
      if (!error && data) setProducts(data);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Product', { product: item })} style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
      <Text style={{ fontSize: 18 }}>{item.title} — R{item.price}</Text>
      <Text numberOfLines={2} style={{ color: '#666' }}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={products} keyExtractor={p => String(p.id)} renderItem={renderItem} />
    </View>
  );
}
