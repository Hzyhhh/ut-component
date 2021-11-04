import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';
import UTable, {
  DataSourceType,
  UTableCommonItemBase,
  UTableMethods,
} from 'ut-component/dist/UTable';
import {ColumnsType} from '../../dist/UTable/type';

const value: {
  [key: string]: DataSourceType<UTableCommonItemBase>;
} = {
  aaa: {
    list: ['1', '2', '3', '4', '5'].map((i, idx) => ({
      id: i,
      sortId: idx,
      isFinished: false,
      isUploaded: false,
    })),
  },
  bbb: {
    title: '123123123123122',
    list: ['1', '2', '3', '4', '5'].map((i, idx) => ({
      id: i,
      sortId: idx,
      isFinished: false,
      isUploaded: false,
    })),
  },
};

const columns: ColumnsType<UTableCommonItemBase> = {
  aaa: [
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
  ],
  bbb: [
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
            const updateItem = t.setItem('bbb', {...r, sortId: 5});
            const list = t.getList('bbb');
            console.log(list, updateItem);
          }}
        />
      ),
    },
  ],
};

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
      <UTable
        ticketId="123"
        columns={columns}
        // value={value}
        header={HeaderRendered}
        footer={FooterRendered}
      />
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
