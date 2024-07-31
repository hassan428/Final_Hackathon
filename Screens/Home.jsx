import {ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {AppBar} from '../component/AppBar';
import {Heading, HeadingText} from '../component/Text_component';
import {StyleSheet} from 'react-native';
import {TaskCard} from '../component/TaskCard';
import {ProgressCard} from './ProgressCard';
import {useSelector} from 'react-redux';

export const Home = () => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
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
  // console.log(newDate.getDate());

  const {
    container,
    scroll_view_horizontal,
    center,
    heading_view,
    bgColor,
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
        {/* const {heading, text, progress} = props; */}

        <ScrollView horizontal style={[scroll_view_horizontal]}>
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

        <View style={[center, progress_view]}>
          <HeadingText text={'In Progress'} />
          <IconButton
            icon="chevron-right"
            iconColor={color}
            size={30}
            style={{left: 10}}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={[container]} style={{backgroundColor}}>
        <ProgressCard
          title="Productivity Mobile App"
          heading="Create Details Booking"
          time="2 min ago"
          percentage={60}
        />

        <ProgressCard
          title="Banking Mobile App"
          heading="Revision Home Page"
          time="5 min ago"
          percentage={70}
        />
        <ProgressCard
          title="Banking Mobile App"
          heading="Revision Home Page"
          time="5 min ago"
          percentage={70}
        />

        <ProgressCard
          title="Online Course"
          heading="Working On Landing Page"
          time="7 min ago"
          percentage={80}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: 'white',
  },
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
    // paddingTop: 20,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
