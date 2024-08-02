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
  const {team} = useSelector(store => store.team);

  return (
    <>
      <AppBar
        title={`Chat`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input icon="magnify" placeholder="Search Profiles" />
        {team.map(({team_name, teamType}, i) => (
          <Chat_card
            name={team_name}
            last_seen={teamType}
            color={color}
            key={i}
          />
        ))}
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
