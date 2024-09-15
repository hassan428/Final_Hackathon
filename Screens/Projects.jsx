import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {ActiveBtn} from '../component/CustomBtn';
import {ProjectsCard} from '../component/ProjectsCard';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

export const Projects = () => {
  const navigation = useNavigation();
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {task} = useSelector(store => store.task);
  const {team} = useSelector(store => store.team);
  const {other_user_profile, profile} = useSelector(store => store.auth);
  const {container, btn_view} = style;
  const [render_task, set_render_task] = useState(task);
  const [search_value, set_search_value] = useState('');

  useEffect(() => {
    set_render_task(
      task.filter(
        ({task_name}) =>
          task_name
            .replace(/\s+/g, '') // Remove all spaces
            .toLowerCase()
            .includes(search_value.replace(/\s+/g, '').toLowerCase()), // Remove all spaces from val too
      ),
    );
  }, [task, search_value]);

  return (
    <>
      <AppBar
        title={`Projects`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        rightIconHandle={() => navigation.navigate('Add_task')}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input
          icon="magnify"
          placeholder="Search Projects"
          value={search_value}
          onChangeText={set_search_value}
        />

        <View style={[btn_view]}>
          <ActiveBtn text="Favourite" />
          <ActiveBtn text="Recents" />
          <ActiveBtn text="All" mode="outlined" style={{padding: 0}} />
          <Icon source="table" size={30} />
        </View>

        <ScrollView>
          {render_task.map(({task_name, board, team: team_id}, i) => {
            const get_team = team.filter(({_id}) => team_id.includes(_id));
            const get_member_id = get_team.flatMap(({members}) => members);

            const get_other_member_details = other_user_profile.filter(
              ({_id}) => get_member_id.includes(_id),
            );

            const member_array = [...get_other_member_details, profile];
            return (
              <ProjectsCard
                heading={task_name}
                title={board}
                progress_num={i / task.length}
                progress_str={`${i}/${task.length}`}
                key={i}
                member_array={member_array}
              />
            );
          })}
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
  btn_view: {
    flexDirection: 'row',
    gap: 15,
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
