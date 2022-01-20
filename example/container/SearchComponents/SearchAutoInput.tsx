import React, {FC} from 'react';
import {AutoItemType, SearchAutoInput} from 'ut-component';

const autoList: AutoItemType[] = [
  {title: '选项1', value: '1'},
  {title: '选项2', value: '2'},
];

const NavigatorSelect: FC = props => {
  return (
    <SearchAutoInput
      title="下拉选择框"
      placeholderText="请选择"
      autoList={autoList}
    />
  );
};

export default NavigatorSelect;
