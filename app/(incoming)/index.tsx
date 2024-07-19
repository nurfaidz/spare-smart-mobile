import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2 } from 'tamagui';

export default function Page() {
  return (
    <SafeAreaView>
      <H2 style={styles.uspet}>Uspet</H2>
    </SafeAreaView>
  );
}

const styles = {
  uspet: {
    fontFamily: 'InterBold',
    color: 'black',
    padding: 140,
    alignSelf: 'center',
  },
};
