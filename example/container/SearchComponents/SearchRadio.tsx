import React, {FC} from 'react';
import {SearchRadio} from 'ut-component';

const NavigatorSelect: FC = props => {
  const radioList = [
    {value: '1', title: '单选1'},
    {value: '2', title: '单选2'},
  ];
  return <SearchRadio title="单选" radioList={radioList} selectedValue="" />;
};

export default NavigatorSelect;
