import {ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {Heading, HeadingText} from '../component/Text_component';
import {StyleSheet} from 'react-native';
import {TaskCard} from '../component/TaskCard';
import {ProgressCard} from './ProgressCard';

export const Home = () => {
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
  console.log(newDate.getDate());

  const {container, scroll_view, center} = styles;
  return (
    <>
      <AppBar
        title={`${day}, ${date}`}
        leftIcon={'table'}
        rightIcon={'bell-outline'}
      />
      <ScrollView style={[container]}>
        <Heading
          myStyle={{width: '85%'}}
          text={"Let's make a habits together  🙌"}
        />
        {/* const {heading, text, progress} = props; */}

        <ScrollView horizontal style={[scroll_view]}>
          <TaskCard
            heading={'Application Design'}
            text={'UI Design Kit'}
            progress_str={'50/80'}
            progress_num={50 / 80}
            isThemeChange={true}
          />
          <TaskCard
            heading={'Overlay Design'}
            text={'UI Design Kit'}
            progress_str={'50/80'}
            progress_num={50 / 80}
            isThemeChange={false}
          />
        </ScrollView>

        <View style={[center]}>
          <HeadingText text={'In Progress'} />
          <IconButton
            icon="chevron-right"
            size={30}
            onPress={() => console.log('Pressed')}
          />
        </View>

        <ProgressCard
          title="Productivity Mobile App"
          time="2 min ago"
          heading="Create Details Booking"
        />
        
        <ProgressCard
          title="Productivity Mobile App"
          time="2 min ago"
          heading="Create Details Booking"
        />

        <ProgressCard
          title="Productivity Mobile App"
          time="2 min ago"
          heading="Create Details Booking"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    // paddingLeft: 0,
  },
  scroll_view: {
    marginTop: 20,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
