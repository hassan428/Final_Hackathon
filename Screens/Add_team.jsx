import {StyleSheet, View} from 'react-native';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {useDispatch, useSelector} from 'react-redux';
import {Member_card} from '../component/Member_card';
import {add_team_action} from '../store/slices/add_slice';
import {ScrollView} from 'react-native';
import {useEffect, useRef, useState} from 'react';

export const Add_team = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {container} = style;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {team} = useSelector(store => store.team);
  const {team_id} = useSelector(store => store.add);
  const filteredUsers = team?.filter(team => !team_id.includes(team._id));
  const [search_value, set_search_value] = useState('');
  const [render_filteredUsers, set_render_filteredUsers] =
    useState(filteredUsers);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
    set_render_filteredUsers(
      filteredUsers.filter(
        ({team_name}) =>
          team_name
            .replace(/\s+/g, '') // Remove all spaces
            .toLowerCase()
            .includes(search_value.replace(/\s+/g, '').toLowerCase()), // Remove all spaces from val too
      ),
    );
  }, [team_id, search_value]);

  return (
    <>
      <AppBar
        title={`Add Team`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input
          icon="magnify"
          placeholder="Search Team"
          onChangeText={set_search_value}
          value={search_value}
          ref={searchInputRef}
          // ref={el => (search_input.current = el)}
        />

        <ScrollView>
          {render_filteredUsers?.map(
            ({team_name, teamType, _id, team_avatar_url}, i) => (
              <Member_card
                color={color}
                username={team_name}
                email={teamType}
                key={i}
                avatar_url={team_avatar_url}
                icon_name={'plus'}
                add_member_handle={() => {
                  dispatch(add_team_action(_id));
                  set_search_value('');
                }}
              />
            ),
          )}
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
