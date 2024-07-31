import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, CardFooter, Image, Text, View, XStack } from 'tamagui';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView
      width="100%"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFD564',
      }}>
      <XStack $sm={{ flexDirection: 'column' }} space style={styles.center}>
        <Card
          // size="$4"
          width={330}
          height={450}
          // scale={0.8}
          backgroundColor="#FFFFFF">
          <Card.Header>
            <View gap="$4">
              <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
              <Text textAlign="center" fontSize="$4" fontFamily="$body">
                Silahkan Masuk
              </Text>
            </View>
          </Card.Header>
          <View paddingHorizontal={20}>
            <Text style={styles.label} p="$1">
              Username atau Email
            </Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Masukkan Username atau Email"
              textAlign="center"
            />
          </View>
          <View padding={20}>
            <Text style={styles.label} p="$1">
              Password
            </Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan Password"
              secureTextEntry
              textAlign="center"
            />
          </View>
          <CardFooter paddingBottom={35} justifyContent="center">
            <XStack>
              <Button onPress={() => {}} hoverStyle={{ scale: 0.925 }} width={125}>
                Masuk
              </Button>
            </XStack>
          </CardFooter>
        </Card>
      </XStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 100,
    marginRight: 25,
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
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
});
