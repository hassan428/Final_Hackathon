import {ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {Heading, HeadingText} from '../component/Text_component';
import {StyleSheet} from 'react-native';
import {TaskCard} from '../component/TaskCard';
import {ProgressCard} from './ProgressCard';
import {useSelector} from 'react-redux';
import {formatDistanceToNow, formatDistanceToNowStrict} from 'date-fns';

export const Home = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {task} = useSelector(store => store.task);
  const {team} = useSelector(store => store.team);
  const {other_user_profile, profile} = useSelector(store => store.auth);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const newDate = new Date();
  const date = newDate.getDate();
  const day = daysOfWeek[newDate.getDay()];

  const {
    container,
    scroll_view_horizontal,
    center,
    heading_view,
    progress_view,
  } = styles;
  return (
    <>
      <View style={{backgroundColor}}>
        <AppBar
          title={`${day}, ${date}`}
          leftIcon={'table'}
          rightIcon={'bell-outline'}
        />

        <View style={[heading_view]}>
          <Heading
            myStyle={{width: '85%'}}
            text={"Let's make a habits together  🙌"}
          />
        </View>

        <ScrollView horizontal contentContainerStyle={[scroll_view_horizontal]}>
          {task.map(({task_name, board, team: team_id}, i) => {
            const get_team = team.filter(({_id}) => team_id.includes(_id));
            const get_member_id = get_team.flatMap(({members}) => members);

            const get_other_member_details = other_user_profile.filter(
              ({_id}) => get_member_id.includes(_id),
            );

            const member_array = [...get_other_member_details, profile];
            return (
              <TaskCard
                heading={task_name}
                text={board}
                progress_num={i / task.length}
                progress_str={`${i}/${task.length}`}
                isThemeChange={i % 2 === 0}
                key={i}
                member_array={member_array}
              />
            );
          })}
        </ScrollView>

        <View style={[center, progress_view]}>
          <HeadingText text={'In Progress'} />
          <IconButton
            icon="chevron-right"
            iconColor={color}
            size={30}
            style={{left: 10}}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={[container]} style={{backgroundColor}}>
        {task.map(({task_name, board, createdAt}, i) => (
          <ProgressCard
            heading={task_name}
            title={board}
            time={formatDistanceToNowStrict(new Date(createdAt), {
              addSuffix: true,
            })}
            percentage={i}
            key={i}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading_view: {
    padding: 20,
  },
  progress_view: {
    paddingHorizontal: 20,
  },
  scroll_view_horizontal: {
    paddingHorizontal: 10,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
