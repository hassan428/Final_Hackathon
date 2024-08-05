import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Member_card} from '../component/Member_card';

export const Chat = () => {
  const navigation = useNavigation();
  const {container} = style;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {team} = useSelector(store => store.team);
  const [render_team, set_render_team] = useState(team);
  const [search_value, set_search_value] = useState('');

  useEffect(() => {
    set_render_team(
      team.filter(
        ({team_name}) =>
          team_name
            .replace(/\s+/g, '') // Remove all spaces
            .toLowerCase()
            .includes(search_value.replace(/\s+/g, '').toLowerCase()), // Remove all spaces from val too
      ),
    );
  }, [team, search_value]);

  return (
    <>
      <AppBar
        title={`Chat`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input
          icon="magnify"
          placeholder="Search Team"
          value={search_value}
          onChangeText={set_search_value}
        />
        <ScrollView>
          {render_team.map(({team_name, teamType, team_avatar_url}, i) => (
            <Member_card
              color={color}
              username={team_name}
              email={teamType}
              key={i}
              avatar_url={team_avatar_url}
              icon_name={'camera-outline'}
            />
            //   add_member_handle={() => dispatch(add_team_action(_id))}
          ))}
        </ScrollView>
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
