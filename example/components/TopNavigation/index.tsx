import React, {FC} from 'react';
import {
  Divider,
  Icon,
  TopNavigation as _TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const BackIcon = props => (
  <Icon {...props} pack="feather" name="chevron-left" />
);

const TopNavigation: FC<TopNavigationProps> = props => {
  const {accessoryRight, ...other} = props;
  const navigation = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <>
      <_TopNavigation
        alignment="center"
        title="Eva Application"
        subtitle="Subtitle"
        accessoryLeft={renderBackAction}
        accessoryRight={accessoryRight}
        {...other}
      />
      <Divider />
    </>
  );
};

export default TopNavigation;
