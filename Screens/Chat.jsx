import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';

export const Chat = () => {
  const navigation = useNavigation();
  const {container} = style;
  return (
    <>
      <AppBar
        title={`Chat`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container]}>
        <Custom_input icon="magnify" placeholder="Search Profiles" />
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
});
