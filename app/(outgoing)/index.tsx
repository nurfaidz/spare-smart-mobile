import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, XStack, YStack, ScrollView, Spinner, Button } from 'tamagui';

export default function Home() {
  const [outgoingItems, setOutgoingItems] = useState<any>([]);
  const router = useRouter();
  useEffect(() => {
    fetch('http://192.168.1.56:8000/api/outgoing-item')
      .then((response) => response.json())
      .then((data) => setOutgoingItems(data.data));
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <YStack>
        <View flexDirection="row" justifyContent="space-between">
          <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
          <XStack
            alignItems="center"
            paddingRight="$3"
            onPress={() => router.push('/')}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}>
            <Ionicons name="arrow-back" size={24} color="black" padding={10} alignSelf="center" />
            <Text fontSize="$4" fontFamily="$body" alignSelf="center">
              Kembali
            </Text>
          </XStack>
        </View>
      </YStack>

      <YStack py="$4" justifyContent="center" bg="#FFD564">
        <Text textAlign="center" color="#333333" fontSize="$4" fontFamily="$body">
          Barang Keluar Suku Cadang
        </Text>
      </YStack>

      <ScrollView bg="#FFD564">
        <YStack px="$6" gap="$4" py="$2">
          <YStack gap="$4">
            {outgoingItems.length === 0 ? (
              <Spinner size="large" color="black" />
            ) : (
              outgoingItems.map((item: any) => (
                <XStack
                  onPress={() =>
                    router.push({
                      pathname: '(outgoing)/detail',
                      params: { id: item.id },
                    })
                  }
                  key={item.id}
                  p="$4"
                  bg="$gray3Light"
                  borderRadius="$4"
                  borderWidth="$0.5"
                  borderColor="#E0E0E0"
                  justifyContent="space-between"
                  alignItems="center"
                  hoverStyle={{ scale: 0.925 }}
                  pressStyle={{ scale: 0.875 }}>
                  <YStack>
                    <Text fontSize="$5" color="#333333">
                      {item.code}
                    </Text>
                    <Text fontSize="$2" color="#666666">
                      {item.spare_part}
                    </Text>
                    <Text fontSize="$2" color="#666666">
                      {item.outgoing_at}
                    </Text>
                  </YStack>
                  <YStack gap="$2">
                    <Text textAlign="right" fontSize="$2">
                      Rp {item.total_price}
                    </Text>
                    <View py="$1" px="$3" bg="$green8Light" borderRadius="$4">
                      <Text textAlign="center" fontSize="$2" color="#333333">
                        {item.quantity} Qty
                      </Text>
                    </View>
                    <View py="$1" px="$3" bg="$green8Light" borderRadius="$4">
                      {item.status === 'Aktif' ? (
                        <Text textAlign="center" fontSize="$2" color="green">
                          {item.status}
                        </Text>
                      ) : (
                        <Text textAlign="center" fontSize="$2" color="red">
                          {item.status}
                        </Text>
                      )}
                    </View>
                  </YStack>
                </XStack>
              ))
            )}
          </YStack>
        </YStack>
      </ScrollView>
      <YStack justifyContent="center" bg="#FFD564">
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            hoverStyle={styles.buttonHover}
            pressStyle={styles.buttonPress}
            onPress={() => router.push('(outgoing)/create')}>
            <Ionicons name="add-circle-outline" size={20} color="black" />
            <Text style={styles.buttonText}>Tambah</Text>
          </Button>
        </View>
      </YStack>
    </SafeAreaView>
  );
}

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
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonHover: {
    backgroundColor: '#FFD564',
  },
  buttonPress: {
    backgroundColor: '#FFC107',
  },
  buttonText: {
    color: '#000000',
    marginLeft: 8,
  },
};
