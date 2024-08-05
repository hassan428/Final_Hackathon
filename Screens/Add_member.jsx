import {ScrollView, StyleSheet, View} from 'react-native';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {useDispatch, useSelector} from 'react-redux';
import {Member_card} from '../component/Member_card';
import {add_member_action} from '../store/slices/add_slice';
import {useEffect, useRef, useState} from 'react';

export const Add_member = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {container} = style;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {other_user_profile} = useSelector(store => store.auth);
  const {member_id} = useSelector(store => store.add);
  const filteredUsers = other_user_profile.filter(
    user => !member_id.includes(user._id),
  );
  const [render_filteredUsers, set_render_filteredUsers] =
    useState(filteredUsers);

  const searchInputRef = useRef(null);
  const [search_value, set_search_value] = useState('');

  useEffect(() => {
    searchInputRef.current.focus();

    set_render_filteredUsers(
      filteredUsers.filter(
        ({username, email}) =>
          username
            .replace(/\s+/g, '') // Remove all spaces
            .toLowerCase()
            .includes(search_value.replace(/\s+/g, '').toLowerCase()) ||
          email
            .replace(/\s+/g, '') // Remove all spaces
            .toLowerCase()
            .includes(search_value.replace(/\s+/g, '').toLowerCase()), // Remove all spaces from val too
      ),
    );
  }, [member_id, search_value]);
  return (
    <>
      <AppBar
        title={`Add Member`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input
          icon="magnify"
          placeholder="Search Member"
          onChangeText={set_search_value}
          value={search_value}
          ref={searchInputRef}
        />
        <ScrollView>
          {render_filteredUsers?.map(
            ({username, email, _id, avatar_url}, i) => (
              <Member_card
                color={color}
                username={username}
                email={email}
                key={i}
                avatar_url={avatar_url}
                icon_name={'plus'}
                add_member_handle={() => {
                  dispatch(add_member_action(_id));
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
