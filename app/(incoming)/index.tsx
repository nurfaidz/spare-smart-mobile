import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Image, XStack, YStack, ScrollView, Spinner } from 'tamagui';

export default function Home() {
  const [incomingItems, setIncomingItems] = useState<any>([]);
  useEffect(() => {
    fetch('http://192.168.1.11:8000/api/incoming-item')
      .then((response) => response.json())
      .then((data) => setIncomingItems(data.data));
  }, []);

  // console.log(incomingItems.forEach((item) => console.log(item)));
  // if (!incomingItems) {
  //   return (
  //     <SafeAreaView>
  //       <Spinner marginTop="$10" />
  //     </SafeAreaView>
  //   );
  // }
  return (
    <SafeAreaView style={{ backgroundColor: '#F5F5F5', height: '100%' }}>
      <YStack>
        <View>
          <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
        </View>
      </YStack>

      <YStack py="$4" justifyContent="center" bg="#FFD564">
        <Text textAlign="center" color="#333333" fontSize="$4" fontFamily="Inter">
          Barang Masuk Suku Cadang
        </Text>
      </YStack>

      <ScrollView bg="#FFD564">
        <YStack px="$6" gap="$4" py="$2">
          <YStack gap="$4">
            {incomingItems.length === 0 ? (
              <Spinner size="large" color="black" />
            ) : (
              incomingItems.map((item) => (
                <XStack
                  key={item.id}
                  p="$4"
                  bg="$gray3Light"
                  borderRadius="$4"
                  borderWidth="$0.5"
                  borderColor="#E0E0E0"
                  justifyContent="space-between"
                  alignItems="center">
                  <YStack>
                    <Text fontSize="$5" color="#333333">
                      {item.code}
                    </Text>
                    <Text fontSize="$2" color="#666666">
                      {item.spare_part}
                    </Text>
                    <Text fontSize="$2" color="#666666">
                      {item.incoming_at}
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
    // marginTop: 50,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};