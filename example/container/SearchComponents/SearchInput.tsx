import React, {FC} from 'react';
import {SearchInput} from 'ut-component';
import TopNavigation from '../../components/TopNavigation';

const SearchInputScreen: FC = props => {
  return (
    <>
      <TopNavigation title="SearchInput" subtitle="" />
      <SearchInput title="输入框" placeholderText="请输入" />
    </>
  );
};

export default SearchInputScreen;
