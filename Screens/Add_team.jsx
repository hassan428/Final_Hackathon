import {StyleSheet, View} from 'react-native';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {useDispatch, useSelector} from 'react-redux';
import {Member_card} from '../component/Member_card';
import {add_member_action, add_team_action} from '../store/slices/add_slice';

export const Add_team = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {container} = style;
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {team} = useSelector(store => store.team);
  const {team_id} = useSelector(store => store.add);
  const filteredUsers = team.filter(team => !team_id.includes(team._id));
  return (
    <>
      <AppBar
        title={`Add Team`}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input icon="magnify" placeholder="Search Team" />

        {filteredUsers?.map(({team_name, teamType, _id}, i) => (
          <Member_card
            color={color}
            username={team_name}
            email={teamType}
            key={i}
            add_member_handle={() => dispatch(add_team_action(_id))}
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
