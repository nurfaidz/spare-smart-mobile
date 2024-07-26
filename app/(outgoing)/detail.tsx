import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, XStack, YStack, ScrollView, Spinner, Separator } from 'tamagui';

export default function Home() {
  const param = useLocalSearchParams();
  const [outgoingItem, setOutgoingItem] = useState<any>([]);

  useEffect(() => {
    fetch('http://192.168.1.14:8000/api/outgoing-item/show/' + param.id)
      .then((response) => response.json())
      .then((data) => setOutgoingItem(data.data));
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
          Detail Barang Masuk Suku Cadang
        </Text>
      </YStack>

      <ScrollView style={styles.scrollContainer}>
        {outgoingItem.length === 0 ? (
          <Spinner size="large" color="black" />
        ) : (
          <View style={styles.card}>
            <DetailItem label="Nama Suku Cadang" value={outgoingItem.spare_part} />
            <Separator borderColor="$gray9Light" />
            <DetailItem label="Jumlah" value={outgoingItem.quantity} />
            <Separator borderColor="$gray9Light" />
            <DetailItem label="Tanggal Barang Masuk" value={outgoingItem.incoming_at} />
            <Separator borderColor="$gray9Light" />
            <DetailItem label="Catatan" value={outgoingItem.note} />
            <Separator borderColor="$gray9Light" />
            <DetailItem label="Status" value={outgoingItem.status} />
            <Separator borderColor="$gray9Light" />
            <DetailItem
              label="Catatan Pembatalan"
              value={outgoingItem.note_cancellation || 'Tidak ada catatan pembatalan'}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailItem = ({ label, value }) => (
  <XStack justifyContent="space-between" py="$2" flexDirection="column">
    <Text fontSize="$3" color="#333" fontWeight="bold">
      {label}:
    </Text>
    <Text
      fontSize="$3"
      color={value === 'Aktif' ? 'green' : value === 'Dibatalkan' ? 'red' : '$gray8Dark'}>
      {value}
    </Text>
  </XStack>
);

//color="#3FA2F6"
const styles = {
  titleHeading: {
    fontSize: 26,
    fontFamily: 'InterBold',
  },
  list: {
    width: Dimensions.get('window').width,
  },
  logo: {
    width: '30%',
    height: 70,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#F5F5F5',
    height: '100%',
  },
  scrollContainer: {
    backgroundColor: '#FFD564',
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};
