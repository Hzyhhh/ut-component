import React, {FC} from 'react';
import {AutoItemType, SearchAutoInput} from 'ut-component';
import TopNavigation from '../../components/TopNavigation';

const autoList: AutoItemType[] = [
  {title: '选项1', value: '1'},
  {title: '选项2', value: '2'},
];

const SearchAutoInputScreen: FC = props => {
  return (
    <>
      <TopNavigation title="SearchAutoInput" subtitle="" />
      <SearchAutoInput
        title="下拉选择框"
        placeholderText="请选择"
        autoList={autoList}
      />
    </>
  );
};

export default SearchAutoInputScreen;
