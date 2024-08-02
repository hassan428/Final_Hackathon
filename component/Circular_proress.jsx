import React from 'react';
import {View, Text} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {useSelector} from 'react-redux';

export const Circular_progress = ({size, strokeWidth, percentage}) => {
  const {primary, backgroundColor, color} = useSelector(store => store.theme);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Svg height={size} width={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
        />
      </Svg>
      <Text
        style={{
          position: 'absolute',
          fontFamily: 'arial',
          fontSize: size / 4,
          fontWeight: 'bold',
          color,
        }}>
        {percentage}%
      </Text>
    </View>
  );
};
