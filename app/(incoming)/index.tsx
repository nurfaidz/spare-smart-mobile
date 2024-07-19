import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2 } from 'tamagui';

export default function Page() {
  return (
    <SafeAreaView width="100%">
      <H2 style={styles.uspet}>Uspet</H2>
    </SafeAreaView>
  );
}

const styles = {
  uspet: {
    fontFamily: 'InterBold',
    color: 'black',
    alignSelf: 'center',
    marginTop: '100%',
  },
};
