import React, {FC} from 'react';

import {NavigatorSelect} from 'ut-component';

const NavigatorSelectSreen: FC = props => {
  const handleClick = () => console.log(123);

  return (
    <NavigatorSelect
      title="点击事件组件"
      placeholderText="好家伙"
      onClick={handleClick}
    />
  );
};

export default NavigatorSelectSreen;
