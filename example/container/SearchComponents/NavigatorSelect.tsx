import React, {FC} from 'react';

import {NavigatorSelect} from 'ut-component';
import TopNavigation from '../../components/TopNavigation';

const NavigatorSelectSreen: FC = props => {
  const handleClick = () => console.log(123);

  return (
    <>
      <TopNavigation title="NavigatorSelect" subtitle="" />
      <NavigatorSelect
        title="点击事件组件"
        placeholderText="好家伙"
        onClick={handleClick}
      />
    </>
  );
};

export default NavigatorSelectSreen;
