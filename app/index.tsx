import { color } from '@tamagui/themes';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { CardProps, Image, Paragraph, Button, H2, Card, XStack } from 'tamagui';

export default function Page() {
  return (
    <SafeAreaView
      backgroundColor="#22668D"
      width="100%"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={require('~/assets/logo/bengkel-ucok.png')} style={styles.logo} />
      <XStack $sm={{ flexDirection: 'column' }} paddingTop="$6" space style={styles.center}>
        <DemoCard
          size="$4"
          width={200}
          height={200}
          scale={0.8}
          hoverStyle={{ scale: 0.925 }}
          pressStyle={{ scale: 0.875 }}
        />
        <DemoCard1
          size="$4"
          width={200}
          height={200}
          scale={0.8}
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
      <Card elevate size="$4" bordered {...props} style={styles.cardBackground}>
        <Card.Header padded>
          <H2 style={styles.titleHeading}>Barang Masuk</H2>
          {/* <Paragraph theme="alt2">Now available</Paragraph> */}
        </Card.Header>
        <Image source={incoming} style={styles.incoming} />
        <Card.Footer padded>
          <Button
            borderRadius="$7"
            style={styles.button}
            hoverStyle={{ backgroundColor: '#FDE49E' }}
            onPress={() => router.push('(incoming)')}>
            Masuk Sini
          </Button>
        </Card.Footer>
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
  return (
    <SafeAreaView>
      <Card elevate size="$4" bordered {...props} style={styles.cardBackground}>
        <Card.Header padded>
          <H2 style={styles.titleHeading}>Barang Keluar</H2>
          {/* <Paragraph theme="alt2">Now available</Paragraph> */}
        </Card.Header>
        <Image source={outgoing} style={styles.outgoing} />
        <Card.Footer padded>
          <Button borderRadius="$7" style={styles.button}>
            Masuk Sini
          </Button>
        </Card.Footer>
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

const styles = {
  titleHeading: {
    fontFamily: 'InterBold',
    fontSize: 24,
    color: 'black',
  },
  incoming: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginLeft: 80,
  },
  outgoing: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginLeft: 80,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 35,
    backgroundColor: '#FEB941',
    marginTop: 5,
    padding: 5,
    color: 'black',
  },
  cardBackground: {
    backgroundColor: '#e8cb96',
    borderColor: 'gray',
  },
  logo: {
    width: '100%',
    height: 140,
    alignSelf: 'center',
    marginTop: 25,
    justifyContent: 'center',
    marginRight: 37,
  },
};
