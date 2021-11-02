import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Button,
} from 'react-native';
import ItemRendered from './ItemRendered';
import {
  ColumnsBase,
  UTableCommonItemBase,
  UTableMethods,
} from 'ut-component/dist/UTable';

const value: UTableCommonItemBase[] = ['1', '2', '3', '4', '5'].map(
  (i, idx) => ({
    id: i,
    sortId: idx,
    isFinished: false,
    isUploaded: false,
  }),
);

const columns: ColumnsBase<UTableCommonItemBase>[] = [
  {
    dataIndex: 'id',
    title: '序号',
    width: 40,
    align: 'center',
  },
  {
    title: '操作内容',
    dataIndex: 'sortId',
    render: r => <Text>{r.sortId}</Text>,
  },
  {
    title: 'asdfasdf',
    dataIndex: 'isFinished',
    align: 'center',
    render: r => <Text>{r.isFinished ? '真的吗' : '假的吧'}</Text>,
  },
  {
    title: '完成',
    dataIndex: 'finish',
    width: 60,
    align: 'center',
    render: (r, index, t) => (
      <Button
        title="点击"
        onPress={() => {
          console.log(r, index);
        }}
      />
    ),
  },
];

interface HeaderRenderedProps extends UTableCommonItemBase {
  a: string;
}

const HeaderRendered = (table?: UTableMethods<HeaderRenderedProps>) => {
  return <>123</>;
};

const FooterRendered = (table?: UTableMethods<HeaderRenderedProps>) => {
  return <>223</>;
};
const ScrollViewScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {HeaderRendered()}
      <ItemRendered title="操作前风险分析及控制措施" dataSource={value} column={columns} />
      <ItemRendered title="操作票操作项" dataSource={value} column={columns} />
      {FooterRendered()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default ScrollViewScreen;
