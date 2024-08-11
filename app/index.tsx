import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { CardProps, Image, H2, Card, XStack, Button } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = async () => {
  try {
    const response = await fetch('http://192.168.212.147:8000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data) {
        await AsyncStorage.removeItem('userToken');
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Gagal logout:', error);
    return false;
  }
};

export default function Page() {
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push('(auth)/sign-in');
    } else {
      Alert.alert('Gagal logout', 'Terjadi kesalahan saat logout');
    }
  };

  return (
    <SafeAreaView
      width="100%"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4F4F4',
      }}>
      <TouchableOpacity
        style={styles.icon}
        onPress={handleLogout}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}>
        <Ionicons name="log-out" size={24} color="white" />
      </TouchableOpacity>
      <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
      <XStack $sm={{ flexDirection: 'column' }} paddingTop="$6" space style={styles.center}>
        <DemoCard
          // size="$4"
          width="$20"
          height="$18"
          // scale={0.8}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
        />
        <DemoCard1
          // size="$4"
          width="$20"
          height="$18"
          // scale={0.8}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
        />
      </XStack>
    </SafeAreaView>
  );
}

export function DemoCard(props: CardProps) {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Card
        elevate
        size="$4"
        bordered
        {...props}
        style={styles.cardBackground}
        onPress={() => router.push('(incoming)')}>
        <Card.Header padded>
          <H2 style={styles.titleHeading}>Barang Masuk</H2>
        </Card.Header>
        <Image source={incoming} style={styles.incoming} />
        <Card.Footer padded />
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
            }}
          />
        </Card.Background>
      </Card>
    </SafeAreaView>
  );
}

export function DemoCard1(props: CardProps) {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Card
        elevate
        size="$4"
        bordered
        {...props}
        style={styles.cardBackground}
        onPress={() => router.push('(outgoing)')}>
        <Card.Header padded>
          <H2 style={styles.titleHeading}>Barang Keluar</H2>
        </Card.Header>
        <Image source={outgoing} style={styles.outgoing} />
        <Card.Footer padded />
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
            }}
          />
        </Card.Background>
      </Card>
    </SafeAreaView>
  );
}

const incoming = require('~/assets/img/incoming.png');
const outgoing = require('~/assets/img/outgoing.png');

const styles = StyleSheet.create({
  titleHeading: {
    fontSize: 24,
    color: '#2F4F4F',
    alignSelf: 'center',
  },
  incoming: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  outgoing: {
    width: 130,
    height: 130,
    alignSelf: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: '#8B0000',
    marginTop: 5,
    padding: 5,
  },
  cardBackground: {
    backgroundColor: '#FFD564',
    borderColor: '#FFD564',
  },
  logo: {
    width: '55%',
    height: 100,
  },
  icon: {
    position: 'absolute',
    top: 35,
    left: 10,
    width: 30,
    height: 30,
    backgroundColor: '#8B0000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
