// import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, YStack, ScrollView, Button } from 'tamagui';

export default function AddIncomingItem() {
  const [sparePartId, setSparePartId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [incomingAt, setIncomingAt] = useState(new Date());
  const [note, setNote] = useState('');
  const router = useRouter();

  const handleSave = () => {
    // Implementasi untuk menyimpan data
    console.log({ sparePartId, quantity, incomingAt, note });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <YStack>
        <View>
          <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
        </View>
      </YStack>

      <YStack py="$4" justifyContent="center" bg="#FFD564">
        <Text textAlign="center" color="#333333" fontSize="$4" fontFamily="$body">
          Detail Barang Masuk Suku Cadang
        </Text>
      </YStack>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <YStack gap="$4">
            <View>
              <Text style={styles.label}>Kode Suku Cadang</Text>
              <TextInput
                style={styles.input}
                value={sparePartId}
                onChangeText={setSparePartId}
                placeholder="Masukkan Kode Suku Cadang"
              />
            </View>
            <View>
              <Text style={styles.label}>Jumlah</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Masukkan Jumlah"
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={styles.label}>Tanggal Masuk</Text>
              {/* <DateTimePicker
                style={styles.input}
                value={incomingAt}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || incomingAt;
                  setIncomingAt(currentDate);
                }}
              /> */}
            </View>
            <View>
              <Text style={styles.label}>Catatan</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={note}
                onChangeText={setNote}
                placeholder="Masukkan Catatan"
                multiline
                numberOfLines={4}
              />
            </View>
            <Button
              style={styles.button}
              hoverStyle={styles.buttonHover}
              pressStyle={styles.buttonPress}
              onPress={handleSave}>
              <Text style={styles.buttonText}>Simpan</Text>
            </Button>
          </YStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '30%',
    height: 70,
  },
  scrollContainer: {
    backgroundColor: '#FFD564',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonHover: {
    backgroundColor: '#FFFFFF',
  },
  buttonPress: {
    backgroundColor: '#FFD564',
  },
  buttonText: {
    color: '$gray8Dark',
    fontSize: 16,
  },
});
