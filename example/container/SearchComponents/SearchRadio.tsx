import React, {FC} from 'react';
import {SearchRadio} from 'ut-component';
import TopNavigation from '../../components/TopNavigation';

const SearchRadioScreen: FC = props => {
  const radioList = [
    {value: '1', title: '单选1'},
    {value: '2', title: '单选2'},
  ];
  return (
    <>
      <TopNavigation title="SearchRadio" subtitle="" />
      <SearchRadio title="单选" radioList={radioList} selectedValue="" />
    </>
  );
};

export default SearchRadioScreen;
