import {StyleSheet, View} from 'react-native';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {useDispatch, useSelector} from 'react-redux';
import {Member_card} from '../component/Member_card';
import {add_member_action} from '../store/slices/add_slice';

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
  return (
    <>
      <AppBar
        title={`Add Member`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input icon="magnify" placeholder="Search Member" />

        {filteredUsers?.map(({username, email, _id}, i) => (
          <Member_card
            color={color}
            username={username}
            email={email}
            key={i}
            add_member_handle={() => dispatch(add_member_action(_id))}
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
