import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, CardFooter, Image, Text, View, XStack } from 'tamagui';

const SignIn = ({ onLoginSuccess }: { onLoginSuccess: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    const data = {
      email,
      password,
    };

    fetch('http://192.168.212.147:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Response body:', text);
            throw new Error('Terjadi kesalahan');
          });
        }
        return response.text();
      })
      .then((text) => {
        try {
          const result = JSON.parse(text);
          if (result.message) {
            setErrorMessage(result.message);
          } else {
            console.log('Sukses:', result);
            const token = result.data.token;
            AsyncStorage.setItem('userToken', token);
            onLoginSuccess(token);
          }
        } catch (error) {
          setErrorMessage('Terjadi kesalahan, silahkan coba lagi');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Terjadi kesalahan, silahkan coba lagi');
      });
  };

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
        <Card width={330} height={450} backgroundColor="#FFFFFF">
          <Card.Header>
            <View gap="$4">
              <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
              <Text textAlign="center" fontSize="$4" fontFamily="$body">
                Silahkan Masuk
              </Text>
              {errorMessage ? <Text textAlign="center" marginBottom="$4" color="#eb0523">{errorMessage}</Text> : null}
            </View>
          </Card.Header>
          <View paddingHorizontal={20}>
            <Text style={styles.label} p="$1">
              Email
            </Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan Email"
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
              <Button
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                marginTop="$4"
                width={125}
                onPress={handleSignIn}>
                Masuk
              </Button>
            </XStack>
          </CardFooter>
        </Card>
      </XStack>
    </SafeAreaView>
  );
};

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

export default SignIn;
