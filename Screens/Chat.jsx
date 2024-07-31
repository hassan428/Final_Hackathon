import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {Chat_card} from '../component/Chat_card';
import {useSelector} from 'react-redux';

export const Chat = () => {
  const navigation = useNavigation();
  const {container} = style;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  return (
    <>
      <AppBar
        title={`Chat`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input icon="magnify" placeholder="Search Profiles" />

        <Chat_card color={color} />
        <Chat_card color={color} />
        <Chat_card color={color} />
        <Chat_card color={color} />
      </View>
    </>
  );
};
const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});
