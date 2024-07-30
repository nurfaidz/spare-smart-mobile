import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, YStack, ScrollView, Button, Spinner } from 'tamagui';

export default function AddIncomingItem() {
  const [sparePartId, setSparePartId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [note, setNote] = useState('');
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSave = () => {
    const data = {
      spare_part_id: sparePartId,
      quantity,
      note,
      incoming_at: date.toISOString().split('T')[0],
    };

    fetch('http://192.168.1.28:8000/api/incoming-item/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        router.push('(incoming)');
        router.setParams({ success: 'true' });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [spareParts, setSpareParts] = useState<any>([]);

  // Get All Spare Parts
  useEffect(() => {
    fetch('http://192.168.1.28:8000/api/incoming-item/create')
      .then((response) => response.json())
      .then((data) => setSpareParts(data.data));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <YStack>
        <View>
          <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
        </View>
      </YStack>

      <YStack py="$4" justifyContent="center" bg="#FFD564">
        <Text textAlign="center" color="#333333" fontSize="$4" fontFamily="$body">
          Tambah Barang Masuk Suku Cadang
        </Text>
      </YStack>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <YStack gap="$4">
            <View>
              <Text style={styles.label}>Kode Suku Cadang</Text>
              {spareParts.length === 0 ? (
                <Spinner size="large" color="black" />
              ) : (
                <RNPickerSelect
                  onValueChange={(value) => setSparePartId(value)}
                  items={spareParts.map((sparePart: { name: any; id: any }) => ({
                    label: sparePart.name,
                    value: sparePart.id,
                  }))}
                  style={pickerSelectStyles}
                  placeholder={{ label: 'Pilih Suku Cadang', value: null }}
                />
              )}
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
              <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>Pilih Tanggal</Text>
              </TouchableOpacity>
              <Text style={styles.dateText}>Tanggal Masuk: {date.toLocaleDateString()}</Text>
              {show && <DateTimePicker value={date} mode={mode} is24Hour onChange={onChange} />}
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
            <Button style={styles.button} pressStyle={styles.buttonPress} onPress={handleSave}>
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
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPress: {
    backgroundColor: '#FFD564',
  },
  buttonText: {
    color: '$gray8Dark',
    fontSize: 16,
  },
  dateButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFC107',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButtonText: {
    color: '#333333',
    fontSize: 16,
  },
  dateText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    height: 40,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    height: 40,
  },
});
