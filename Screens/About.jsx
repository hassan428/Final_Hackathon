import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppBar} from '../component/AppBar';
import {useSelector} from 'react-redux';
import {HeadingText, SomeText} from '../component/Text_component';
import {useNavigation} from '@react-navigation/native';
import {Logo} from '../component/Logo';

export const About = () => {
  const navigation = useNavigation();
  const {backgroundColor, color, primary} = useSelector(store => store.theme);
  const {container, heading, scroll_view, text} = styles;

  return (
    <>
      <AppBar
        title={'About Application'}
        leftIcon={'chevron-left'}
        leftIconHandle={() => navigation.goBack()}
      />
      <ScrollView style={[scroll_view, {backgroundColor}]}>
        <View style={container}>
          <Logo fontSize={40} logoColor={primary} />
          <SomeText
            myStyle={{...text, color}}
            text="Welcome to Taskcy, your simple and effective solution for team management. Taskcy allows users to easily create teams, add team members, and collaborate on tasks. Whether you're organizing a project or managing daily activities, Taskcy is designed to streamline teamwork."
          />
          <SomeText
            myStyle={{...text, color}}
            text="With Taskcy, you can:
- Create teams and add members.
- Assign and manage tasks within your team.
- Collaborate efficiently with all team members."
          />

          <SomeText myStyle={{...text, color}} text="Version: 1.0.0" />
          <SomeText myStyle={{...text, color}} text="Developed by: Taskcy" />
          <SomeText
            myStyle={{...text, color}}
            text="For more information or support, contact us at support@taskcy.com."
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scroll_view: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    gap: 15,
    alignItems: 'center',
    marginVertical: 30,
  },
  heading: {
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
