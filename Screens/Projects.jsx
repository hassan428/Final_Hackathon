import {ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {useNavigation} from '@react-navigation/native';
import {Custom_input} from '../component/Custom_input';
import {ActiveBtn} from '../component/CustomBtn';
import {ProjectsCard} from '../component/ProjectsCard';
import {useSelector} from 'react-redux';

export const Projects = () => {
  const navigation = useNavigation();
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const {task} = useSelector(store => store.task);

  const {container, btn_view} = style;
  return (
    <>
      <AppBar
        title={`Projects`}
        leftIcon={'chevron-left'}
        rightIcon={'plus'}
        leftIconHandle={() => navigation.goBack()}
      />
      <View style={[container, {backgroundColor}]}>
        <Custom_input icon="magnify" placeholder="Search Profiles" />

        <View style={[btn_view]}>
          <ActiveBtn text="Favourite" mode="outlined" style={{padding: 0}} />
          <ActiveBtn text="Recents" />
          <ActiveBtn text="All" />
          <Icon source="table" size={30} />
        </View>

        <ScrollView>
          {task.map(({task_name, board}, i) => (
            <ProjectsCard
              heading={task_name}
              title={board}
              progress_num={i / task.length}
              progress_str={`${i}/${task.length}`}
              key={i}
            />
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
  btn_view: {
    flexDirection: 'row',
    gap: 15,
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
