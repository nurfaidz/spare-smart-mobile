import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, XStack, YStack, ScrollView } from 'tamagui';

export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <YStack>
        <View>
          <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
        </View>
      </YStack>

      <YStack py="$4" justifyContent="center" bg="#FFD564">
        <Text textAlign="center" color="#333333" fontSize="$4" fontFamily="Inter">
          Barang Keluar Suku Cadang
        </Text>
      </YStack>

      <ScrollView bg="#FFD564">
        <YStack px="$6" gap="$4" py="$2">
          <YStack gap="$4">
            <XStack
              p="$4"
              bg="$gray3Light"
              borderRadius="$4"
              borderWidth="$0.5"
              borderColor="#E0E0E0"
              justifyContent="space-between"
              alignItems="center">
              <YStack>
                <Text fontSize="$5" color="#333333">
                  PPLO9012
                </Text>
                <Text fontSize="$2" color="#666666">
                  Shock Breaker YMH 12
                </Text>
                <Text fontSize="$2" color="#666666">
                  23 Juli 2024
                </Text>
              </YStack>
              <YStack gap="$2">
                <Text textAlign="right" fontSize="$2">
                  Rp 2.100.000
                </Text>
                <View py="$1" px="$3" bg="$green8Light" borderRadius="$4">
                  <Text textAlign="center" fontSize="$2" color="#333333">
                    19 Qty
                  </Text>
                </View>
                <View py="$1" px="$3" bg="$green8Light" borderRadius="$4">
                  <Text textAlign="center" color="green" fontSize="$2">
                    Aktif
                  </Text>
                </View>
              </YStack>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const DATA = [
  {
    id: '1',
    code: 'PPLO9012',
    name: 'Shock Breaker YMH 12',
    date: '23 Juli 2024',
    price: 'Rp 2.100.000',
    qty: '19',
    status: 'Aktif',
  },
  {
    id: '2',
    code: 'PPLO9013',
    name: 'Filter Karbu YMH 002',
    date: '13 Oktober 2024',
    price: 'Rp 2.200.000',
    qty: '20',
    status: 'Aktif',
  },
  {
    id: '3',
    code: 'PPLO9014',
    name: 'Kampas Rem YMH 003',
    date: '14 Oktober 2024',
    price: 'Rp 2.300.000',
    qty: '21',
    status: 'Aktif',
  },
];

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
};
