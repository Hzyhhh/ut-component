import {useNavigation} from '@react-navigation/native';
import {
  Divider,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {FC} from 'react';
import {
  AutoItemType,
  NavigatorSelect,
  SearchAutoInput,
  SearchComponent,
  SearchInput,
  SearchRadio,
  SearchTags,
  SearchSelect,
  RightActionsRendered,
} from 'ut-component';

const radioList = [
  {value: 'male', title: '男'},
  {value: 'female', title: '女'},
];

const autoList: AutoItemType[] = [
  {value: 'vue', title: 'Vue'},
  {value: 'react', title: 'React'},
  {value: 'angular', title: 'Angular'},
];

const tagList = [
  {value: 'vuex', text: 'Vuex'},
  {value: 'mobx', text: 'Mobx'},
  {value: 'redux', text: 'Redux'},
];

const BackIcon = props => (
  <Icon {...props} pack="feather" name="chevron-left" />
);

const renderRightActions = () => (
  <RightActionsRendered>
    <RightActionsRendered.MenuItem title="123" />
  </RightActionsRendered>
);

const BasicUsage: FC = props => {
  const navigation = useNavigation();

  const handleNameChange = (name: string) => {
    console.log(name);
  };

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <Layout level="1">
      <TopNavigation
        alignment="center"
        title="Eva Application"
        subtitle="Subtitle"
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Divider />

      <SearchComponent>
        <SearchInput
          title="姓名"
          placeholderText="请输入姓名"
          onChange={handleNameChange}
        />
        <SearchComponent.Input
          title="别名"
          placeholderText="请输入姓名别名"
          onChange={handleNameChange}
        />
        <NavigatorSelect title="地址" placeholderText="请输入地址" />
        <SearchRadio title="性别" radioList={radioList} />
        <SearchAutoInput
          title="技术框架"
          placeholderText="请选择框架"
          autoList={autoList}
        />
        <SearchTags title="数据流" tagList={tagList} />
        <SearchSelect
          title="数据流"
          list={tagList}
          placeholder="请选择数据流框架"
        />
      </SearchComponent>
    </Layout>
  );
};

export default BasicUsage;
